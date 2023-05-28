---
title: (Machine Learning) Linear Regression 
layout: single 
classes : wide
author_profile: true
read_time : true
share : true 
category : Data Science
tags: 
    - Data Science   
    - Linear Regression 
    - Machine Learning 
    - Probability & Statistics
---

# Introduction 
This is my study note of public course [CS229](https://cs229.stanford.edu) of machine learning. The goal of machine learning algorithm is to learn a mapping $$h$$ from the space of input values (features) $$\mathcal X$$ to the space of output values (targets) $$\mathcal Y$$. The training set consists of a list of pairs training example $$(x^{(i)}, y^{(i)})$$ , where index $$i$$ runs from $$1,\dots, m$$. We often call the function $$h$$ as hypothesis. Once we learned the algorithm, we can feed the algorithm with new inputs $$x$$ to predict $$y$$. 


# Linear Regression 
linear regression is the simplest machine learning algorithm, we approximate the output $$y$$ as linear function of $$x$$ 

$$
h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 = \sum^{d = 2 }_{i=0} \theta_i x_i ,
$$

where the $$\theta_i$$'s are the parameters of linear regression, paramaterizing the space of of linear function from $$\mathcal X$$ to $$\mathcal Y$$. Besides, the number of features is denoted by $$d$$. We can write it in vector form 

$$
h_\theta(x) = \theta^T x, 
\theta = 
\begin{bmatrix}
\theta_0 \\
\theta_1\\
\theta_2 
\end{bmatrix}, 
x = 
\begin{bmatrix}
1 \\
x_1\\
x_2 
\end{bmatrix}.
$$

The problem is to ask how to choose the parameters $$\theta$$ such that $$h_\theta(x) \approx y$$ for the training example. The suitable choice of $$\theta$$ is the one that minimises the $$\textbf{square difference}$$ for all training example. We define the measure (cost funciton) as

$$
J(\theta) = \frac{1}{2} \sum^m_{i=1} ( h_\theta(x^{(i)}) - y^{(i)})^2.
$$

Once the cost function is minimized, we use the $$\theta$$ as the suitable parameters for our linear regression model. The choice of squared difference stems from the probabilistics interpretation of Gaussian random noises.


# Batch and Stochastic Gradient Descent
Our goal in linear regression is to find out the parameter $$\theta$$ which minimizes the cost function $$J(\theta)$$. The optimization process can be achieved with gradient descent. The gradient descent algorithm first starts with an initial guess $$\theta$$, and repeatly perfrom the update 

$$
\theta_j := \theta_j  - \alpha \frac{ \partial J(\theta)}{\partial \theta_j}, j = 0, 1, \dots, d ,
$$

where $$\alpha$$ is the $$\textbf{learning rate}$$. The 'colon equal' sign denotes $$\theta$$ is being updated instead of equality. The intuition of gradient descent is analogous to a ball rolling in a smooth potential well. The position of the ball is subsequently updated with the displacement $$\alpha \partial_{i} J(\theta)$$ in which $$\partial_i J(\theta)$$ can be viewed as velocity. Given that we have the explicit form of cost function $$J(\theta)$$, we can compute its derivative w.r.t to $$\theta$$ 

$$
\begin{align}
\frac{\partial J}{\partial \theta_j} &= \frac{1}{2} \cdot 2  ( h_\theta(x) - y)  \frac{\partial}{\partial \theta_j}(  h_\theta - y) \\ 
&= ( h_\theta(x) - y) \frac{\partial}{\partial \theta_j}\big( \sum^n_{i=0} \theta_i x_i - y \big) \\ 
&= ( h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)} \\ 
\end{align}
$$

for a $$\textbf single$$ traning example. If we have $$n$$ training example, the gradient descent will be 

$$
\theta_j := \theta_j - \alpha \sum^m_{i=1} ( h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)}
$$

This is the $$\textbf{Batch Gradient Descent (BGD)}$$ algorithm since for each $$j$$, we need to use a batch of training example to update $$\theta_j$$ until convergence. The pseudo code of BGS is the following 

```
# Repeat until J(theta) converges
# This is Pseudo code

# Init a d-dimensional theta vector for BGD
theta = np.random.rand(d)

# Define the cost fuction 

def J(theta, x, y): 
    retuen 0.5 * np.sum((theta.conj().T @ x - y)**2)

# set threshold 
thres = 1E-3

# set learning rate 
alpha = 0.5 

# Update the theta 
while J(theta, x, y) <= thres 
    for j in range(0, d): 
        theta[j] = theta[j] - alpha * np.sum( (y - h(x) )* x_j )
```

One disavantange of batch gradient descent is the speed since for each step we need to use a batch of data to complete a single update. To overcome this, we use $$\textbf{Stochastic Gradient Descent (SGD)}$$. SGD provides us a more efficient way to find out the suitable $$\theta$$ using less time. The algorithm of SGD is the following 

```
Loop { 
    for i in range(1, m){ 
        for j in range(1, d){ 
            \theta_i = \theta_i - alpha * ( h_theta(x^(i)) - y^(i) ) x_j^(i)
        }
    }
}
```
In this SGD, each time we use one training example to update the $$\theta$$. In contrast, the BGD scans through the entire training set to make a single update. In most scenario, SGD gets $$\theta$$ close to the minimum much faster than the BGD 

# Probabilistic Interpretation of Least Square
In this session we are going to discuss the reason of using least square as cost function. Before going on, we first assume that 

$$
y^{(i)} = \theta^{T} x^{(i)} + \epsilon^{(i)} = \sum^{d}_{j =0} \theta_j x^{(i)}_j + \epsilon^{(i)}, \epsilon^{(i)} \sim \mathcal N (0, \sigma^2),
$$

where the error term $$\epsilon^{(i)}$$ is normally distributed with zero mean and finite variance $$\sigma$$, capturing the unmodelled effects. Besides, we further impose that $$\epsilon^{(i)}$$ are independently and identically distributed (i.i.d). For instance, suppose we are dealing with housing prices. The error of one house is independent with others house under i.i.d assumption. The probability density of $$\epsilon^{(i)}$$ is normal distribution 

$$
P( \epsilon^{(i)}) = \frac{1}{\sqrt{2 \pi \sigma^2}} \exp \Big( -\frac{ (\epsilon^{(i)})^2 }{2 \sigma^2} \Big)
$$ 

Under these assumptions, we can infer the probability 

$$
P(y^{(i)} \vert x^{(i)}; \theta) = \frac{1}{\sqrt{2 \pi \sigma^2} } \exp \Big(  - \frac{ (y^{(i)} - \theta^Tx^{(i)})^2 }{ 2 \sigma^2}      \Big).
$$

This probability $$P(y^{(i)} \vert x^{(i)}; \theta)$$ refers to the conditional probability of $$y^{(i)}$$ given $$x^{(i)}$$ and parameterized by $$\theta$$. One thing to notice is that $$\theta$$ is not a random variable here. We are not conditioning on $$\theta$$, instead, we are parameterizing $$y^{(i)}$$ using $$\theta$$. We can also write 

$$
y^{(i)} \vert x^{(i)}; \theta \sim \mathcal N( \theta^T x^{(i)}, \sigma^2)
$$

In Bayesian statistics, the distribution $$P(y^{(i)} \vert x^{(i)}; \theta)$$ is the likelohood distribution. Recall that 

$$
P( x^{(i)}; \theta | y^{(i)}) = \frac{ P(y^{(i)} \vert x^{(i)}; \theta) P( x^{(i)}) }{ P(y^{(i)}) }.
$$

Now, we consider a matrix $$X$$ which contains all $$x^{(i)}$$'s, we are interested in the distribution of $$y^{(i)}$$'s. The distribution is given by $$P( \vec y \vert X; \theta)$$. Since each measurement is independent of each other and same for the error terms, the joint likelohood $$P( \vec y \vert X; \theta)$$ is simply the product of each P(y^{(i)} \vert x^{(i)}; \theta). As a result, 

$$
L(\theta)  = \prod^m_{i=1} P(y^{(i)} \vert x^{(i)}; \theta) = \prod^m_{i=1} \frac{1}{\sqrt{2 \pi \sigma^2} } \exp \Big(  - \frac{ (y^{(i)} - \theta^Tx^{(i)})^2 }{ 2 \sigma^2}      \Big)
$$

The problem now turns to find $$\theta$$ which maximizes the $$L(\theta)$$. This is the $$\textbf{maximum likelihood principle}$$. Instead of maximizing the likelihood, it is the same of maxmizing the $$\textbf{log-likelihood} l(\theta)$$ which is a convex function. Simply taking a logarithm on both sides, we obtain 

$$
l(\theta) = -  \frac{n}{2} \log( 2 \pi \sigma^2 )  -  \frac{1}{2\sigma^2} (y^{(i)} - \theta^Tx^{(i)})^2, 
$$

Which coincides with the least-squares cost function. 