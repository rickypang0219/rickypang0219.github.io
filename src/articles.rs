//! Build-time Markdown rendering. The source files remain unchanged and downloadable.
use pulldown_cmark::{html, Event, Options, Parser, Tag, TagEnd};
use regex::Regex;
use std::collections::HashMap;

pub struct RenderedArticle {
    pub html: String,
    pub toc: String,
    pub math_count: usize,
}

pub fn escape(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&#39;")
}

// Adapter for the old React articles, which wrapped Markdown captions in raw HTML.
// Applied only to manifest entries explicitly marked legacy_html.
fn legacy_markup(source: &str) -> String {
    let comments = Regex::new(r"(?s)<!--.*?-->").unwrap();
    let source = comments.replace_all(source, "");
    let wrappers = Regex::new(r"(?i)</?p(?:\s+[^>]*)?>|<br\s*/?>").unwrap();
    let source = wrappers.replace_all(&source, "\n\n");
    let images = Regex::new(r#"<img\s+src="([^"]+)"[^>]*>"#).unwrap();
    let source = images.replace_all(&source, |caps: &regex::Captures| {
        let path = &caps[1];
        let alt = match path.rsplit('/').next().unwrap_or("") {
            "bias-variance.png" => "Underfitting, balanced fitting, and overfitting in regression",
            "classification_fitting.png" => {
                "Underfitting, balanced fitting, and overfitting in classification"
            }
            "regularization.jpeg" => "Model fits with different regularization strengths",
            "lagrane_multiplier.png" => "Constrained extrema on the unit circle",
            "level_curve.png" => "Tangent level curves at a constrained optimum",
            "lp_norm.png" => "Geometry of different Lp norm constraints",
            "L1_L2_comparison.png" => "Comparison of L1 and L2 regularization contours",
            _ => "Article illustration",
        };
        // No inherited width/height: the article stylesheet preserves the image ratio.
        format!("\n\n![{alt}]({path})\n\n")
    });
    let spans = Regex::new(r##"<span style="color:\s*(?:#a9dde0|orange);?">"##).unwrap();
    let source = spans
        .replace_all(&source, "<span class=\"article-highlight\">")
        .into_owned();
    // Captions were indented inside <p> in the old source. Once the wrapper is
    // removed, four leading spaces would incorrectly turn them into code blocks.
    source
        .lines()
        .map(|line| {
            if line.trim_start().starts_with("Fig") {
                line.trim_start()
            } else {
                line
            }
        })
        .collect::<Vec<_>>()
        .join("\n")
}

fn safe_url(url: &str) -> String {
    let normalized: String = url.chars().filter(|c| !c.is_ascii_control()).collect();
    let lower = normalized.trim().to_ascii_lowercase();
    if lower.starts_with("//")
        || (lower
            .split(['/', '?', '#'])
            .next()
            .unwrap_or("")
            .contains(':')
            && !lower.starts_with("https:")
            && !lower.starts_with("http:")
            && !lower.starts_with("mailto:"))
    {
        return "#".to_string();
    }
    if let Some(path) = normalized.strip_prefix("/images/") {
        format!("../../images/{path}")
    } else {
        normalized
    }
}

pub fn render(source: &str, legacy_html: bool) -> RenderedArticle {
    let normalized = if legacy_html {
        legacy_markup(source)
    } else {
        source.to_owned()
    };
    let options = Options::ENABLE_MATH
        | Options::ENABLE_TABLES
        | Options::ENABLE_STRIKETHROUGH
        | Options::ENABLE_FOOTNOTES;
    let events: Vec<_> = Parser::new_ext(&normalized, options)
        .into_offset_iter()
        .collect();
    let mut output = Vec::new();
    let mut toc = String::new();
    let mut used_ids = HashMap::<String, usize>::new();
    let mut heading_level = 2;
    let mut math_count = 0;
    for (i, (event, range)) in events.iter().enumerate() {
        let converted = match event.clone() {
            Event::Start(Tag::Heading { level, .. }) => {
                let mut title = String::new();
                for (part, _) in &events[i + 1..] {
                    match part {
                        Event::End(TagEnd::Heading(_)) => break,
                        Event::Text(s)
                        | Event::Code(s)
                        | Event::InlineMath(s)
                        | Event::DisplayMath(s) => title.push_str(s),
                        _ => (),
                    }
                }
                let slug = title
                    .to_lowercase()
                    .split(|c: char| !c.is_alphanumeric())
                    .filter(|s| !s.is_empty())
                    .collect::<Vec<_>>()
                    .join("-");
                let slug = if slug.is_empty() {
                    "section".to_owned()
                } else {
                    slug
                };
                let count = used_ids.entry(slug.clone()).or_default();
                *count += 1;
                let id = if *count == 1 {
                    slug
                } else {
                    format!("{slug}-{count}")
                };
                heading_level = (level as u8 + 1).min(6);
                toc.push_str(&format!(
                    "<li{}><a href=\"#{}\">{}</a></li>",
                    if heading_level > 2 {
                        " class=\"toc-sub\""
                    } else {
                        ""
                    },
                    escape(&id),
                    escape(&title)
                ));
                Event::Html(format!("<h{heading_level} id=\"{}\">", escape(&id)).into())
            }
            Event::End(TagEnd::Heading(_)) => Event::Html(format!("</h{heading_level}>\n").into()),
            Event::InlineMath(tex) | Event::DisplayMath(tex) => {
                math_count += 1;
                // The old article uses $$...$$ inside prose as well as standalone blocks.
                let full_line_start = normalized[..range.start]
                    .rsplit('\n')
                    .next()
                    .unwrap_or("")
                    .trim()
                    .is_empty();
                let full_line_end = normalized[range.end..]
                    .split('\n')
                    .next()
                    .unwrap_or("")
                    .trim()
                    .is_empty();
                let display =
                    matches!(event, Event::DisplayMath(_)) && full_line_start && full_line_end;
                Event::Html(
                    format!(
                        "<span class=\"math math-{}\">{}</span>",
                        if display { "display" } else { "inline" },
                        escape(&tex)
                    )
                    .into(),
                )
            }
            Event::Html(raw) | Event::InlineHtml(raw) => {
                if legacy_html
                    && matches!(
                        raw.as_ref(),
                        "<span class=\"article-highlight\">" | "</span>"
                    )
                {
                    Event::InlineHtml(raw)
                } else {
                    // Raw HTML is displayed as text, never executed.
                    Event::Text(raw)
                }
            }
            Event::Start(Tag::Image {
                link_type,
                dest_url,
                title,
                id,
            }) => Event::Start(Tag::Image {
                link_type,
                dest_url: safe_url(&dest_url).into(),
                title,
                id,
            }),
            Event::Start(Tag::Link {
                link_type,
                dest_url,
                title,
                id,
            }) => Event::Start(Tag::Link {
                link_type,
                dest_url: safe_url(&dest_url).into(),
                title,
                id,
            }),
            other => other,
        };
        output.push(converted);
    }
    let mut body = String::new();
    html::push_html(&mut body, output.into_iter());
    RenderedArticle {
        html: body,
        toc,
        math_count,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn original_article_keeps_seven_figures_and_six_sections() {
        let source = include_str!("../public/markdowns/Regularization-BiasVariance.md");
        let result = render(source, true);
        assert_eq!(result.html.matches("<img ").count(), 7);
        assert_eq!(result.toc.matches("<li").count(), 6);
        assert!(result.math_count > 60);
        assert!(result
            .html
            .contains("../../images/Reguliarization-BiasVariance/lp_norm.png"));
        assert!(!result.html.contains("width=\"1000\""));
        assert!(result.html.contains("https://ekamperi.github.io/"));
        assert!(!result.html.contains("[source]"));
    }
    #[test]
    fn inline_and_block_math_preserve_tex() {
        let r = render(
            "Inline $$x^2$$ and $y$.\n\n$$\n\\begin{align*}\nx &< y \\\\\n\\end{align*}\n$$\n",
            false,
        );
        assert_eq!(r.html.matches("math-inline").count(), 2);
        assert_eq!(r.html.matches("math-display").count(), 1);
        assert!(r.html.contains("x &amp;&lt; y"));
        assert!(r.html.contains("\\begin{align*}"));
    }
    #[test]
    fn heading_ids_are_unique_and_safe() {
        let r = render("# Same title\n\n# Same title\n\n## Other\n", false);
        assert!(r.html.contains("<h2 id=\"same-title\">"));
        assert!(r.html.contains("<h2 id=\"same-title-2\">"));
        assert!(r.html.contains("<h3 id=\"other\">"));
        assert!(r.toc.contains("href=\"#same-title-2\""));
    }
    #[test]
    fn raw_html_and_unsafe_links_do_not_execute() {
        let r = render(
            "<script>alert(1)</script>\n\n[bad](javascript:alert) ![bad](data:text/html,test)",
            false,
        );
        assert!(!r.html.contains("<script>"));
        assert!(!r.html.contains("href=\"javascript:"));
        assert!(!r.html.contains("src=\"data:"));
    }
    #[test]
    fn code_fences_are_not_equations() {
        let r = render("```rust\nlet math = \"$x$\";\n```\n", false);
        assert_eq!(r.math_count, 0);
        assert!(r.html.contains("language-rust"));
    }
}
