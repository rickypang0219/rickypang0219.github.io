#[cfg(not(target_arch = "wasm32"))]
fn main() -> Result<(), Box<dyn std::error::Error>> {
    use ricky_homepage::articles::{escape, render};
    use serde::Deserialize;
    use std::{collections::HashSet, fs, path::Path};

    #[derive(Deserialize)]
    struct Article {
        slug: String,
        title: String,
        date: String,
        category: String,
        source: String,
        description: String,
        #[serde(default)]
        legacy_html: bool,
    }
    let articles: Vec<Article> = serde_json::from_str(&fs::read_to_string("articles.json")?)?;
    let mut slugs = HashSet::new();
    for article in articles {
        if article.slug.is_empty()
            || !article
                .slug
                .chars()
                .all(|c| c.is_ascii_lowercase() || c.is_ascii_digit() || c == '-')
            || !slugs.insert(article.slug.clone())
        {
            return Err("Article slugs must be unique lowercase URL slugs".into());
        }
        if article.source.contains('/')
            || article.source.contains('\\')
            || !article.source.ends_with(".md")
        {
            return Err("Article source must be a Markdown filename".into());
        }
        let source = fs::read_to_string(Path::new("public/markdowns").join(&article.source))?;
        let rendered = render(&source, article.legacy_html);
        let minutes = source.split_whitespace().count().div_ceil(200);
        let replacements = [
            ("{{TITLE}}", escape(&article.title)),
            ("{{DESCRIPTION}}", escape(&article.description)),
            ("{{DATE}}", escape(&article.date)),
            ("{{CATEGORY}}", escape(&article.category)),
            ("{{SOURCE}}", escape(&article.source)),
            ("{{MINUTES}}", minutes.to_string()),
            ("{{TOC}}", rendered.toc),
            ("{{CONTENT}}", rendered.html),
        ];
        let mut page = include_str!("../../templates/article.html").to_string();
        for (key, value) in replacements {
            page = page.replace(key, &value);
        }
        let directory = Path::new("dist/articles").join(&article.slug);
        fs::create_dir_all(&directory)?;
        fs::write(directory.join("index.html"), page)?;
        println!(
            "Rendered {} ({} equations)",
            article.slug, rendered.math_count
        );
    }
    Ok(())
}

#[cfg(target_arch = "wasm32")]
fn main() {}
