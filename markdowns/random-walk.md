# Introduction
1D random walk is a discrete-time stochastics process. Although it's simple, its ideas and  generalizations are omnipresent in real-world application such as stock market. Besides, it is an example of [Markov Chain](https://en.wikipedia.org/wiki/Markov_chain) and [Martingale](https://en.wikipedia.org/wiki/Martingale_(probability_theory)) in some conditions. In this post, I will use Gambler ruin as an example to introduce 1D random walk, and then discuss its properties. 



# Gambler's ruin
Gambler ruin is a betting game in which a gambler $$A$$ makes a sequence of $$ \$1 $$ bets. In each bet, gambler $$ A $$ has probability $$p$$ of winning the game and probability $$q = 1-p $$ of losing the bet. This gambler start with $$ \$ \text{i} $$ dollars. The gambler wins if he/she earns $$N$$ dollars in total or busts if he/she loses all the money. <span style="color:#a9dde0">**What's the probability that gambler $$A$$ wins the game?**</span>


<p align="center" style="text-align: justify">
    <img src="/images/random_walk/random_walk.png" width="1000" height="300" />
</p>

Fig (1).  [Visulization of Gambler's ruin problem.](https://www.amazon.com/Introduction-Probability-Chapman-Statistical-Science/dp/1138369918) Suppose the gambler starts with $$ \S \text{i}$$ dollars. He/She has probabilty $$p$$ to win $$ \$1 $$ dollar and lose $$ \$ 1 $$ with probabilty $$q$$. 


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

where $$X_k$$ is a random variable indicating whether we win or lose $$i$$-th round. These $$X_k$$'s are <span style="color:#a9dde0">**indentically and independetly distributed(i.i.d)**</span>.   $$W$$ also is a random variable since the sum of random variable is a random variable. The explicit form of $$ X_k $$ is

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

<p align="center" style="text-align: justify" >
    <img src="/images/random_walk/random_walk2.svg" > 
</p>

Fig (2). Simple random walk in one dimension. The probability of moving $$\pm x$$ directions are the same. The black dash lines denote the variance of the simple random walk $$\text{Var}(W) = n $$, where $$n$$ is the steps. The code is available in [here](https://github.com/rickypang0219/stochastic_process)!

The remaining problem is to ask what is the probability distribution of the position of the random walker after $$N$$ steps. We will find out this probability in two ways. The first and easiest way is to use [Central Limit Theorem](https://en.wikipedia.org/wiki/Central_limit_theorem). The random variables $$X_k$$'s are i.i.d and the random walk is the sum of these $$X_k$$'s. Therefore, Central Limit Theorem assures that the corresponding distribution converges in Normal distribution if $$X_k$$'s have finite variance

$$
W = X_N + \cdots X_1 \sim \mathcal{N}( 0, N ) 
$$

since $$\mathbb E[W] =0 $$ and $$\text{Var}(W) = N$$. Another way is to compute the probability distribution explicitly. The probability distribution we interested is the position distribution after $$N$$ steps at position $$M$$. From random walk property, $$M$$ is even only when $$N$$ is also even. For a random walk, we can encode the "path" into a string like 

$$
[-1,1,1,-1,1,1,-1,1,\dots, -1,1 ] .
$$

The reason of encoding the random walk into a string is that it remminds us the  <span style="color:#a9dde0"> **Binomial distribution** </span> for coin tosses. For coin tosses example, $$X$$ number of heads is binomial distributed

$$
X \sim Bin(N,p)  ~,~ P ( X = k) = {N \choose k} p^{N-k} q^k 
$$

with probability $$p$$ for the occurence of head in a toss and corresponding distribution $$P(X = k) $$ for $$k \in \mathbb{N}$$. The combinatoric factor counts for the number of combinations satisfying $$k$$ heads for instance. Back to the random walk, it has the same structure of coin toss, thus it follows binomial distribution 

$$
\begin{align}
P_M  &= {N \choose R } p^{N - R} q^{R} \\
&= {N \choose R} \Big( \frac{1}{2} \Big)^{N- R } \Big( \frac{1}{2} \Big)^{R } \\
&= \frac{N !}{ (N - R)! R! } \Big( \frac{1}{2} \Big)^{N}
\end{align}
$$

where $$R$$ is the number of steps to the right and $$N - R$$ is the number of steps moving to left. Therefore, the distance of a random walk should be the difference between number of steps to the right and left which is $$M = R - (N - R) = 2R - N $$. Notice that though $$N$$ is a number we known, $$R$$ and $$M$$ are random variables. Suppose the  number of total steps $$N$$ is large enough, we can apply Stirling approximation $$ N! = \sqrt{2 \pi N} ( N/ e )^{N} $$ and obtain the following 

$$ \small
P_M \approx \frac{1}{\sqrt{2 \pi}} \exp \Big [- N \log 2 + (N +1/2) \log N - (R + 1/2) \log R - (N - R +1/2 ) \log (N-R) \Big ].
$$

In here, we use another approximation that $$N \gg M $$ and $$R \approx 1/2$$ and consider the $$\log R$$ term

$$
\begin{align} 
\log R &= \log( (N + M)/2 ) \\ 
&= \log N/2 ( 1+ 2M/N) \\ 
&= \log N/2 + \log(1 + 2M/N) \\ 
& \sim \log N/2 + M/N  + M^2/N^2
\end{align}
$$

by using Taylor expansion in third line. By using this trick in other terms, we obtain the following

$$
P_M \approx \frac{1}{\sqrt{2 \pi N}} e^{- \frac{M^2}{N}}
$$

which is the Normal distribution with zero mean and standard deviation $$\sigma = \sqrt N$$. Therefore we show the distance $$M$$ after $$N$$ steps in the random walk is distributed as 

$$
M \sim \mathcal N (0, N)
$$

which matches the result given by Central Limit Theorem. 

# Random Walk in Higher Dimension and the Diffisive Pfroperty
In here we are going to derive the equation governing the simple random walk in higher dimension, which is the diffusion equation. The approach will have discrete time steps, but the steps direction is a continuous random variable associating with the probability distribution $$g(\vec \Delta)$$, where $$\vec \Delta$$ is a unit vector in higher dimension. What we want is probability distribution $$\rho(\vec r,t)$$ describing the position of random walk at time $$t$$. The corresponding probabiliy $$\rho(\vec r, t) dV $$ will be the probability that the random walker appears in the region $$dV$$. One interesting question is to ask how the probability distribution evolves in time. In next time step $$t + \tau $$, the random walker will randomly go to somewhere according to the probability $$g(\vec \Delta) $$. Therefore, what we really interested is the probability distribution of the random walker $$\rho( \vec r , t + \tau) $$ at later time step and position $$\vec r$$. It can be calculated by marginalizing the probability of $$g(\vec \Delta)$$

$$
\rho( \vec r,t+ \tau) = \int \rho( \vec r - \vec \Delta, t) g(\vec \Delta) d^3 \vec \Delta 
$$

Suppose the jump is small enough $$ \vert \Delta \vert \approx 0 $$, we can Taylor expand the probability distribution $$\rho(\vec r - \vec \Delta, t) $$ to 

$$
\rho( \vec r - \vec \Delta,t  ) = \rho(\vec r, t) - \vec \nabla \rho  \cdot \vec \Delta + \frac{1}{2} \sum_{ij} \partial_i \partial_j  \rho \Big \vert_{\vec r} \Delta_i \Delta_j , 
$$

where $$\vec \nabla \rho  \cdot \vec \Delta$$ is the directional derivative along the vector $$\vec \Delta$$. Since we are dealing with simple random walk model, it means that the probability of jumping to $$\pm \vec \Delta $$ is the same where $$R( \theta) $$ is the rotation matrix. Hence, the second term will be vanished 

$$
\int (\vec \nabla \rho  \cdot \vec \Delta) g(\vec \Delta) d^3 \vec \Delta = 0
$$

The first order approximation of probability distribution vanishes and this is why we need to Taylor exapnd to second order term. By plugging in the Taylor expansion of probability distribution back to the integral, we have 

$$
\begin{align}
\rho( \vec r, t + \tau ) & = \int \Big ( \rho(\vec r, t) + \frac{1}{2} \sum_{ij} \partial_i \partial_j  \rho \Big \vert_{\vec r} \Delta_i \Delta_j \Big) g( \vec \Delta) d^3 \vec \Delta  \\ 
&= \int \rho(\vec r, t) g(\vec \Delta) d^3 \vec \Delta + \int   \frac{1}{2} \sum_{ij} \partial_i \partial_j  \rho \Big \vert_{\vec r} \Delta_i \Delta_j  g( \vec \Delta) d^3 \vec \Delta \\
&= \rho(\vec r , t ) + \frac{1}{2} \sum_{ij} \partial_{i} \partial_{j} \rho \Big \vert_{\vec r} \int \Delta_i \Delta_j g( \vec \Delta) d^3 \vec \Delta 
\end{align}
$$

Using the same argument of simple random walk in which the probability of jumping anywhere is isotropic, we can simplify the integral in last line by inspecting $$g(x, y,z) = g(-x, y,z) $$. Therefore, if $$ i \neq j $$ the integral term vanishes and only survives when $$i = j$$. With this isotropic property we can further massage the integral 

$$
\sum_i \int \Delta_i^2 g(\vec \Delta ) d^{3} \vec \Delta = \sum_{i} \langle \Delta_i^2 \rangle 
$$

which is the expectation value of $$\Delta^2_i$$. We can solve it by using simple argument based on isotropic condition. Recall that in three dimension length of a vector $$\vec \Delta $$ is given by $$ \vert \vec\Delta \vert^2 = \Delta_x^2 + \Delta_y^2 + \Delta_z^2$$. If we take the expectation value of it, it becomes 

$$
\begin{align}
\langle \vert \vec\Delta \vert^2  \rangle &= \langle \Delta_x^2 \rangle + \langle \Delta_y^2 \rangle +\langle \Delta_z^2 \rangle  \\ 
&= 3 \langle \Delta_x^2 \rangle
\end{align}
$$

where in last step we use the isotropic condition that jumping to $$x,y,z$$ direction is same. Therefore, the integral now becomes the $$\langle \Delta^2_i \rangle = \frac{1}{3} \langle \Delta^2 \rangle $$ which is the second momemnt of $$\Delta$$. The time evolution of the probability distribution is 

$$
\begin{align}
\rho(\vec r,t + \tau) - \rho(\vec r, t) &\approx \frac{1}{2* 3} \sum_{ij} \langle \Delta^2 \rangle \partial_i \partial_j \rho(\vec r,t ) \\
\partial_t \rho(\vec r, t) &= D \nabla^2 \rho(\vec r,t) ~,D = \frac{ \langle \Delta^2 \rangle}{6 \tau}
\end{align}
$$

if we let $$\tau \approx 0 $$ and $$\rho(\vec r,t + \tau) - \rho(\vec r, t) = \frac{\partial \rho}{\partial t} \tau$$. This is the <span style="color:#a9dde0"> **diffusive equation** </span> and we can solve it in either using Fourier analysis or Feynman propagator(aka Heat Kernel). The solution of the diffusive equation depends on the boundary conditions. 



# Summary
In this post, we first introduce the random walk using Gambler ruin example in wihch a gambler can win or lose 1 dollar at each round. Then we hope to find out the probability of winning of the gambler given that he/she starts the game at $i dollar. Soving the difference equation we obtain the solutions of the winning probability op  the gambler. In next step, we focus on the statistics of the simple random walk model and find out its probability distribution of the position $$M$$ at $$N$$ steps using CLT argument and direct computation. Lastly, we discuss higher dimension form of simple random walk and its diffisive property governed by diffisive equation. 




### References 
* [Harvard Stat 110 Lecture 7](https://youtu.be/PNrqCdslGi4)
* [MIT 18.S096 Lecture 5](https://youtu.be/TuTmC8aOQJE)
* [Introduction to Probability by Joseph Blitzstein & Jessica Hwang](https://drive.google.com/file/d/1VmkAAGOYCTORq1wxSQqy255qLJjTNvBI/view)
* [Thinking Probabilistically by Ariel Amir](https://www.cambridge.org/core/books/thinking-probabilistically/4715E96F0FC041FC0C3EEB5EF8002C8F)