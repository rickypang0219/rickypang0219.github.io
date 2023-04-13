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
1D random walk is a discrete-time stochastics process. Although it's simple, its ideas and  generalizations are omnipresent in real-world application such as stock market. Besides, it is an example of [Markov Chain](https://en.wikipedia.org/wiki/Markov_chain) and [Martingale](https://en.wikipedia.org/wiki/Martingale_(probability_theory)) in some conditions. In this post, I will use Gambler ruin as an example to introduce 1D random walk, and then discuss its properties. 



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

with the boundary conditions $$p_0 = 0 $$ and $$p_N = 1 $$. This is the difference equation and its solution is 

$$
P_i=
    \begin{cases}
      \frac{1- \big(  \frac{p}{q} \big)^{i}  }{1- \big(  \frac{p}{q} \big)^{N} }, & p \neq q ;  \\
      \frac{i}{N}, & p = q = 0.5.
    \end{cases} 
$$





# Properties of One-dimensional Random Walk
The gambler ruin example is an example of one-dimensional random walk because at each step we either go forward to the $N dollars or move backward tp $0 dollar with given probabilities. In this section, we focus on the statistical property of the random walk model. Suppose we start the gambler ruin game at $$X_0$$ dollars and we follow the rules of gambler ruin. At $$n \in \mathbb N$$ steps the current money of a gambler is 

$$
W = \sum^{n}_{k=1} X_{k} +  X_0 = X_n + X_{n-1} + \cdots + X_1 + X_0
$$

where $$X_k$$ is a random variable indicating whether we win or lose $$i$$-th round. $$W$$ also is a random variable since the sum of random variable is a random variable. The explicit form of $$ X_k $$ is

$$
X_k=
    \begin{cases}
      1, & P( X = 1) = p ;\\
      -1, & P( X = -1) = q = 1 - p.
    \end{cases}, 
$$

where $$p, q$$ are the probabilities of winning and losing the current round, respectively. In the **simple** random walk case we set $$p = q = 0.5$$. We now focus on the  <span style="color:#a9dde0">**simple random walk**</span> problem where $$p=q = 0.5$$ and $$X_0 = 0$$. Given a random variable, we are intersted the summary statistics associated with it such as the expectation value, variance, or the moments. The expectation value of <span style="color:#a9dde0">**simple**</span> random walk is 0 by symmetry. Apart from this argument, we can calculate it explicity using the linearity of expectation value

$$
\begin{align*}
\mathbb E [ W ] &= \mathbb E \big[  \sum^{n}_{k=1} X_{k} +  X_0  \big]  = \sum^n_{k=1} \mathbb E [X_i] + X_0 = 0 \\
\mathbb E [X_i] &= (1) \cdot p + (-1) \cdot q = 0 , 
\end{align*}
$$

under the conditions of $$X_0 = 0 $$ and $$p =q $$. Besides, we can calculate the  variance of $$W$$ in similar manner. Recall the formula of the variance of a random variable

$$
\begin{align*}
\text{Var}(W) &= \mathbb E [ (W - \mathbb E[W] )^2  ] \\ 
&= \mathbb E [ W^2 - 2  W \mathbb E[W] + (\mathbb E[W])^2 ] \\ 
&= \mathbb E[W^2] - 2 \mathbb E[W] \mathbb E[W] + (\mathbb E[W])^2 \\
&= \mathbb E[W^2] - \mathbb E[W]^2 . 
\end{align*}
$$

The unknown part inside the formula of variance is the $$\mathbb E[W^2]$$. To solve this we can expand the term inside the expectation value

$$
\begin{align*}
\mathbb E[W^2] &= \mathbb E [ \sum_k \sum_i X_{k}X_{i}]  \\
&= \sum_{ik} \mathbb E[X_k X_i] .
\end{align*}
$$

There are two possible outcomes of the $$\mathbb E[X_k X_i] $$ depending on the indices $$i,k$$. When $$i=k$$ the expectation values is the variance of the $$X_i$$. On the other hand, if $$k \neq i$$ we can factorize $$\mathbb E[X_k X_i] = \mathbb E[X_k] \mathbb E[X_i] $$ since <span style="color:#a9dde0"> **$$X_k$$'s are i.i.d.** </span>

$$
\mathbb E[X_k X_i ] =
    \begin{cases}
      \mathbb E [X_k^2] \delta_{ik} = p \cdot (1)^2 + q \cdot (-1)^2 =1 \delta_{ik}, & k = i ;\\
      \mathbb E[X_i] \mathbb E[X_k] = 0, & i \neq k.
    \end{cases}, 
$$

Therefore, the variance of $$W$$ is simply the summing all the terms of $$\mathbb E [X_k^2]$$ 

$$
\text{Var}  [W] = \sum_{ik} \mathbb E [X_kX_i] \delta_{ik}  = \sum_i \mathbb E[X_i^2] = n 
$$

where $$n$$ is the number of steps of random walk, or you can view it as number of rounds in the gambler ruin example. 





# Random Walk in Higher Dimension
In here we are going to derive the equation governing the simple random walk in higher dimension, which is the diffusion equation. The approach will have discrete time steps, but the steps direction is a continuous random variable associating with the probability distribution $$g(\vec \Delta)$$, where $$\vec \Delta$$ is a unit vector in higher dimension. What we want is probability distribution $$\rho(\vec r,t)$$ describing the position of random walk at time $$t$$. The corresponding probabiliy $$\rho(\vec r, t) dV $$ will be the probability that the random walker appears in the region $$dV$$. One interesting question is to ask how the probability distribution evolves in time. In next time step $$t + \tau $$, the random walker will randomly go to somewhere according to the probability $$g(\vec \Delta) $$. Therefore, what we really interested is the probability distribution of the random walker $$\rho( \vec r , t + \tau) $$ at later time step and position $$\vec r$$. It can be calculated by marginalizing the probability of $$g(\vec \Delta)$$

$$
\rho( \vec r,t+ \tau) = \int \rho( \vec r - \vec \Delta, t) g(\vec \Delta) d^3 \vec \Delta 

$$




# Summary





### References 
* [Harvard Stat 110 Lecture 7](https://youtu.be/PNrqCdslGi4)
* [MIT 18.S096 Lecture 5](https://youtu.be/TuTmC8aOQJE)
* [Introduction to Probability by Joseph Blitzstein & Jessica Hwang](https://drive.google.com/file/d/1VmkAAGOYCTORq1wxSQqy255qLJjTNvBI/view)
* [Thinking Probabilistically by Ariel Amir](https://www.cambridge.org/core/books/thinking-probabilistically/4715E96F0FC041FC0C3EEB5EF8002C8F)