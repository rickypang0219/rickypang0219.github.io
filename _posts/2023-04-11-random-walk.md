---
title: (Quant Series) One-dimensional Random Walk
layout: single 
classes : wide
author_profile: true
read_time : true
share : true 
category : Quant Series
tags: 
    - Stochastic Process  
    - Quant Finance 
    - Probability & Statistics
---

# Introduction
1D random walk is a discrete-time stochastics process. Although it's simple, its ideas and  applications are omnipresent in real-world application such as stock market. Besides, it is an example of [Markov Chain](https://en.wikipedia.org/wiki/Markov_chain) and [Martingale](https://en.wikipedia.org/wiki/Martingale_(probability_theory)) in some conditions. In this post, I will use Gambler ruin as an example to introduce 1D random walk, and then discuss its properties. 



# Gambler's ruin
Gambler ruin is a betting game in which a gambler $$A$$ makes a sequence of $$ \$1 $$ bets. In each bet, gambler $$ A $$ has probability $$p$$ of winning the game and probability $$q = 1-p $$ of losing the bet. This gambler start with $$ \$ \text{i} $$ dollars. The gambler wins if he/she earns $$N$$ dollars in total or busts if he/she loses all the money. <span style="color:#a9dde0">**What's the probability that gambler $$A$$ wins the game?**</span>


<p align="center" style="text-align: justify">
    <img src="/assets/post_images/random_walk/random_walk.png" />
    Fig (1).  [Visulization of Gambler's ruin problem.](https://www.amazon.com/Introduction-Probability-Chapman-Statistical-Science/dp/1138369918) Suppose the gambler starts with $$ \S \text{i}$$ dollars. He/She has probabilty $$p$$ to win $$ \$1 $$ dollar and lose $$ \$ 1 $$ with probabilty $$q$$. 
</p>


This gambler ruin is an example of  <span style="color:#a9dde0">**1D random walk**</span> between integer $$0$$ and $$ N$$ where in each step you have probability $$p$$ of winning $1 dollar (moving forward to $N) or losing $1 dollar (moving backward to $0). To answer the question, we need to use conditional probability and the law of total probability (LOTP). We first let $$ W $$ be the event of winning the game. We then let 

$$P_i = P( W \vert \text{A starts at i} ) $$

be the conditional probabilty of gambler A winning the game if he/she starts with $i dollars. Using the LOTP, conditioning on the outcome of the first round, we have 

$$ \small
\begin{align*}
P_i &= P( W \vert \text{A starts at i, win 1 round} ) P(\text{win 1 round })  +   P( W \vert \text{A starts at i, lose 1 round} ) P(\text{lose 1 round }) \\ 
&= P( W \vert \text{A starts at i+1} ) \cdot p   +   P( W \vert \text{A starts at i-1} ) \cdot q \\ 
&= P_{i+1} \cdot p + P_{i-1} \cdot q 
\end{align*}
$$

with the boundary conditions $$p_0 = 0 $$ and $$p_N = 1 $$. 



# Properties of One-dimensional Random Walk
The one-dimensional random walk is a stochastic process where at each step $$i$$, we either move forward or move backward on $$x$$ axis with corresponding probability. We can define a random variable at step $$i$$ 

$$
X_i=
    \begin{cases}
      1, & P( X = 1) = p \\
      -1, & P( X = -1) = q = 1 - p 
    \end{cases} ~~, 
$$

where $$p, q$$ are the probabilities satisfying $$p + q = 1$$. In the **simple** random walk case we set $$p = q = 0.5$$. 

