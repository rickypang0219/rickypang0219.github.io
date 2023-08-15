# Introduction
This is a self-learning note of Stanford open course CS229. In this post I will talk about the bias-variance tradeoff of machine learning algorithms and how to avoid overfitting using regularization.  

# Bias and Variance 

<p align="center" style="text-align: justify">
    <img src="/images/Reguliarization-BiasVariance/bias-variance.png" width="1000" height="400" />
</p>

Fig (1).  Underfitting Vs. Overfitting. The left most picture is the linear regression on data ( $$y = \theta_0 + \theta_1 x_1$$) which represent **high bias** or underfitting ; The middle plot is the balanced fitting of data; The right most plot is the polynomial regression ($$y = \theta_0 + \theta_1 x + \cdots + \theta_n x^n$$) ([source](https://docs.aws.amazon.com/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html)). 


<!-- ![Bias Variance Tradeoff](/assets/post_images/Reguliarization-BiasVariance/bias-variance.png) 

*Fig. 1.  Underfitting Vs. Overfitting. The left most picture is the linear regression on data ( $y = \theta_0 + \theta_1 x_1$) which represent **high bias** or underfitting ; The middle plot is the balanced fitting of data; The right most plot is the polynomial regression ($y = \theta_0 + \theta_1 x + \cdots + \theta_n x^n$) ([source](https://docs.aws.amazon.com/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html))* -->


The above figure shows different cases when we applying learning algorithms to a given dataset. For instance, $$Y$$ is the housing prices and $$X$$ is the size of houses. The left most figure is called  <span style="color:#a9dde0">**high bias**</span> or underfitting.   <span style="color:#a9dde0">**High bias**</span> in machine learning context means a very strong preconception that data could be fit by a linear function, while the linear function cannot capture the trend that may be semi-evident in the data. Then we say this algorithm is high bais. 

In contrast, we call the leftmost case as  <span style="color:#a9dde0">**High variance**</span> or overfitting. The term  <span style="color:#a9dde0">**high variance**</span> comes from the intuition of curve-fitting of different learning examples. Suppose there are two housing data collected by two group of students in Hong Kong. We should expect that the result of the learning algorithm should be similar. However, with high variance learning algorithm the results of these two dataset could be quite different, meaning that the resulted curves are not looking same. Therefore, your prediction would have a very high variance as we think of it as averaging over different random draws of data. 


Similarly for the classification problem, there are also underfitting and overfitting. For instance, we can use support vector machine (SVM) to fit a non-linear boundary with feature mapping 

$$
\phi(x) = 
\begin{bmatrix}
x_1 \\
x_2 \\
x_1^2 \\
x_2^2 \\ 
x_1 x_2 \\ 
\vdots
\end{bmatrix}. 
$$

If we have too many features, then we might end up with a learning algorithm that overfits. In this case, the learning algorithm has perfect performance on the training set but overfits.


<p align="center" style="text-align: justify">
    <img src="/images/Reguliarization-BiasVariance/classification_fitting.png" width="1000" />
</p>

Fig (2).  Different fitting of classification problems ([source](https://www.geeksforgeeks.org/underfitting-and-overfitting-in-machine-learning/)). 


<!-- ![](./images/Reguliarization-BiasVariance/classification_fitting.png) *Different fitting of classification problems ([source](https://www.geeksforgeeks.org/underfitting-and-overfitting-in-machine-learning/))* -->


# Mathematical Discussion of Bias-Variance Tradeoff
In this session, we inverstigate the mathematical derivation of bias-variance tradeoff for <span style="color:#a9dde0">**regression**</span> problem. Before calculation, we have the following setup 

* Draw a training dataset $$S = \{ x^{(i)}, y^{(i)} \}^m_{i=1}$$ such that $$y^{(i)} = h^{\star}(x^{(i)}) + \xi^{(i)},~ \xi^{(i)} \sim \mathcal N(0, \sigma^2)$$, where $$h^{\star}(\dot)$$ and $$\xi^{(i)}$$ are the **true function** and noise, respectively
* Train a model on the dataset $$S$$, denoted by $$\hat h_S$$
* Take a test example $$(x, y)$$ such that $$y = h^{\star}(x) + \xi$$ and measure the expected test error (averaged over the random draw of the training set $$S$$ and the randomness of $$\xi$$) 

$$
MSE(x) = \mathbb E_{S, \xi} \big[ (y - h_S(x))^2 \big ], 
$$

where MSE refers to <span style="color:#a9dde0">**Mean Square Error**</span>. In the following, we will decompose the MSE in terms of bias and variance. By linearity, we can decompose the expected value as 

$$
\begin{align*}
MSE(x) &= \mathbb E_{S, \xi} [ ( h^{\star}(x) + \xi - h_S(x))^2 ] \\ 
&=  \mathbb E_{S, \xi} [ ( \xi + (h^{\star}(x) -  h_S(x) ))^2 ] \\ 
&= \mathbb E_{S, \xi} [\xi^2] + 2 \mathbb E_{S, \xi}[\xi (h^{\star}(x) -  h_S(x) )  ]  +  \mathbb E_{S, \xi}[(h^{\star}(x) -  h_S(x) )^2 ]
\end{align*}
$$

Here we use the assumption that <span style="color:#a9dde0">**$$\xi$$ and $$h^{\star} - h_S$$ are independent**</span> with the fact that $$\mathbb E_{S, \xi} [\xi]  = 0$$ therefore we can simplify the MSE expression 

$$
\begin{align*}
MSE(x)  &= \mathbb E_{\xi} [\xi^2]  + \mathbb E_{S}[(h^{\star}(x) -  h_S(x) )^2 ] \\  
&= \sigma^2 + \mathbb E_{S}[(h^{\star}(x) -  h_S(x) )^2 ]
\end{align*}
$$

The remaining task is to further decompose the $$\mathbb E_{S}[(h^{\star}(x) -  h_S(x) )^2 ]$$. Before that, we define $$h_{avg}(x) = \mathbb E_S[h_S(x)]$$ which is the average model. The averaging process is done by drawing an infinite number of datasets, training on them, and averaging their predictions on $$x$$. However, we cannot obtain infinite number of  datasets in reality. Such a average model is thus hypothetical. It turns out that for many cases, $$h_{avg}$$ is approximately equal to the model obtained by a dataset with infinite samples (<span style="color: orange;">Maybe relate to Ergodic theorem</span>). By adding and subtracting $$\mathbb E_S [h_{avg}]$$ inside $$\mathbb E_{S}[(h^{\star}(x) -  h_S(x) )^2 ]$$, we can obtain the bias and variance term 

$$
\begin{align*}
\mathbb E_{S}[(h^{\star}(x) -  h_S(x) )^2 ] &= 
\mathbb E_{S}[\Big(  (h^{\star}(x) - h_{avg})  -  (h_S(x) - h_{avg}) \Big)^2 ]  \\ 
&= (h^{\star}(x) -  h_{avg}(x) )^2 + \mathbb E_{S}[(h_S(x) - h_{avg})^2]  \\ 

&= (h^{\star}(x) -  h_{avg}(x) )^2 + \mathbb E_{S}[(h_S(x) - \mathbb E_S[h_S] )^2] \\ 
 
&= (h^{\star}(x) -  h_{avg}(x) )^2 + Var(h_S(x)). 
\end{align*}
$$

In second line we use the fact that $$\mathbb E_S [h_S - h_{avg}] = h_{avg} -h_{avg} = 0$$ with the independence assumption, thus the expected value of the cross term vanishes. Combine the result with the definition of MSE, we get 

$$
MSE(x) = \underbrace{\sigma^2}_{\text{Unavoidable}} +  \underbrace{(h^{\star}(x) -  h_{avg}(x) )^2}_{\triangleq \text{Bias}^2} + \underbrace {Var(h_S(x))}_{\triangleq \text{Variance} }.
$$

# Regularization 

<p align="center" style="text-align: justify">
    <img src="/images/Reguliarization-BiasVariance/regularization.jpeg" width="1000" />
</p>

Fig (3).  Different choices of Lagrange multiplier $$\lambda$$ in regularization ([source](https://towardsdatascience.com/understanding-regularization-in-machine-learning-d7dd0729dde5)). 

<!-- ![Regularization](images/Reguliarization-BiasVariance/regularization.jpeg) *Different choices of Lagrange multiplier $\lambda$ in regularization ([source](https://towardsdatascience.com/understanding-regularization-in-machine-learning-d7dd0729dde5))* -->

Regularization is a technique to avoid overfitting in machine learning algorithms. For instance, we first introduce the <span style="color:#a9dde0">**L2 regularization**</span> of linear regreesion to seek the intuition. The R2 regularization of linear regression is 

$$
\min_\theta~ \frac{1}{2} \sum^{m}_{i=1} \lVert y^{(i)} - \theta^T x^{(i)} \rVert^2 ~~+ \underbrace{\lambda \lVert \theta \rVert^2}_{\text{Regularization} }.
$$

When we set $$\lambda = 0$$, it returns to the original cost function and the learning algorithm is still overfitting. In contrast, if $$\lambda$$ is large enough, the regularization terms dominates in the cost function. Therefore, the minimum of cost function appears in $$\theta = \vec 0$$ and the resulted learning algorithm is flat line with high bias. As a result, we need to choose a suitable range of $$\lambda$$ such that the regularization works, for instance, $$\lambda =  0.5$$. 

For classification learning algorithms such as logistic regression, the L2 regularization is 

$$
\text{argmax}_\theta \sum^m_i \log P( y^{(i)} \vert x^{(i)} ; \theta ) - \lambda \lVert \theta \rVert^2 .
$$

For logistic regression we substract the regularization term since $$\lambda \lVert \theta \rVert^2$$ is concave function and we can search the maximum using gradient descent. 

In previous session, we claim that support vector machine can handle million features with the kernel method. Besides, we also know that kernel method may result in overfitting. The reason why support vector machine works fine is that the $$\lVert w \rVert^2$$ acts as an regularization term to avoid overfitting. 


# Lagrange Multiplier

<p align="center" style="text-align: justify">
    <img src="/images/Reguliarization-BiasVariance/lagrane_multiplier.png" width="1000" height="500"/>
</p>

Fig (4).  The maximum and minimum points of $$f(x,y)$$ when $$(x,y)$$ is restricted by the unit circle $$x^2 + y^2 = 1$$. Therfore, the usual gradient method does not work since gradient at these points are not 0 ([source](https://thfong.files.wordpress.com/2022/07/main.pdf)). 

<!-- ![Lagrange Multiplier](images/Reguliarization-BiasVariance/lagrane_multiplier.png)*The maximum and minimum points of $f(x,y)$ when $(x,y)$ is restricted by the unit circle $x^2 + y^2 = 1$. Therfore, the usual gradient method does not work since gradient at these points are not 0 ([source](https://thfong.files.wordpress.com/2022/07/main.pdf))* -->




Here is a more mathematical involving discussion on the origin of regularization technique using Lagrange multiplier. In both single variables and multivariable calculus, we can use the gradient to find out the maximum or minimum of a given function inside the interior of the domain. However, the problem of finding maximum or minimum becomes tricky when we seek then max/min on the boundary of the domain. For this problem, the gradient method does not work since the tanget plane at maximum/minimum needs not to be horizontal. 

<p align="center">
  <img src="/images/Reguliarization-BiasVariance/level_curve.png" width="1000" height="500"/>
  Fig(5). The level curve of $$f(x,y)$$ and $$g(x,y) = c$$. The maximum/minimum occurs when their gradient parallel/anti-parallel
  <br>

</p> 

<!-- *The level curve of $f(x,y)$ and $g(x,y) = c$. The maximum/minimum occurs when their gradient parallel/anti-parallel* -->



The Lagrange multiplier provids a simple method to find out the maximum/minimum on the boundary. Suppose that given a function $$f(x,y)$$ which we want to maximize or minimize, and the variables $$(x,y)$$ is restriccted by the constraint $$g(x,y) = c$$. To find out all the possible candidates of maximum/minimum, all we need to do is to solve the Lagrange multiplier equations 

$$
\begin{align*}
\nabla f(x,y) &= \lambda \nabla g(x,y) \\ 
g(x,y) &= c .
\end{align*}
$$

Once we solved these equations, we can check the whether the solution $$(x,y)$$ is maximum or minimum. We can rewrite the Lagrange multiplier method into a *Lagrangian*

$$
\begin{align*}
L(x,y) &=  f(x,y) + \lambda( c - g(x,y) )   \\
\nabla L(x,y)  &= 0 \Rightarrow \nabla f(x,y) = \lambda \nabla g(x,y)
\end{align*}
$$

From the gradient of Lagrangian, we can see that the maximum/minimum occurs on the boundary once the gradient $$\nabla f(x,y)$$ and $$\lambda \nabla g(x,y)$$ equals with a Lagrange multiplier $$\lambda$$.


# L1 and L2 Regularization 

<p align="center" style="text-align: justify">
    <img src="/images/Reguliarization-BiasVariance/lp_norm.png"  width="1000" />
    <br>
    Fig (6).  Visualization of $$L_p$$ norms. Becareful that when $$p \geq 1$$ the $$L_p$$ norms are convex set. $$L_{0.5}$$ norm is not a convec set clearly since by connecting the two vertices with a line, the line lies outside the interior of $$L_{0.5}$$ domain. ([source](https://ekamperi.github.io/machine%20learning/2019/10/19/norms-in-machine-learning.html)). 
</p>


<!-- ![Lp norm](images/Reguliarization-BiasVariance/lp_norm.png)*Visualization of $L_p$ norms. Becareful that when $p \geq 1$ the $L_p$ norms are convex set. $L_{0.5}$ norm is not a convec set clearly since by connecting the two vertices with a line, the line lies outside the interior of $L_{0.5}$ domain. ([source](https://ekamperi.github.io/machine%20learning/2019/10/19/norms-in-machine-learning.html))* -->

In previous session, we breiftly introduce the use of regularization to avoid overfitting. In here, we will investigate how L1 and L2 regularization avoid overfitting in a more mathematical setting. The name of L1 and L2 regularization are stemmed from the $$L_p$$ norms. $$L_p$$ norm is a generalization of distance measure in Euclidean space. The Euclidean distance $$\lVert \vec v \rVert =  \sqrt{v_1^2 + \cdots v_n^2}$$ is a special case of $$L_p$$ norm when $$p=2$$. The definition of $$L_p$$ norm 

$$
\lVert x \rVert _p = \big(  \sum_i^N \vert x_i \vert_p \big)^{1/p}, ~ \text{for $p \geq 1$}.
$$

The reason of introducing the $$L_p$$ norm is that the $$L_p$$ norm constrains the possible range of model parameter $$\theta$$ in the learning algorithm to avoid overfitting. When we use the gradient descent to find out the model parameter $$\theta$$ previously, we do not care too much of the magnitude of them in the training. Suppose that magnitude of the model parameter is large enough, the error will be much greater once we multiplier the model parameter with the new dataset, affecting accuracy of the result. To avoid the model parameter being too large, we restrict the possible range of the model paramter using the $$L_p$$ norms, especially the $$L_1$$ and $$L_2$$ norms. Therefore, we can rewrite the problem as 

$$ 
\begin{align*}
\max_\theta J(\theta) ~&s.t.~ \lVert \theta \rVert_1 \leq C ;\\
\max_\theta J(\theta) ~&s.t.~ \lVert \theta \rVert_2 \leq C , 
\end{align*}
$$

where $$C$$ controls the domain of $$L_p$$ norms, similar to the radius $$r$$ for $$L_2$$ norm (i.e. $$r = \sqrt{x_1^2 + x_2^2 + \cdots + x_n^2}$$). We can solve the above problems using <span style="color:#a9dde0">**Lagrange Multiplier**</span>


$$
\begin{align*}
\mathcal L (\theta, \lambda) &= J(\theta) + \lambda( \lVert \theta \rVert_p  - C ) \\
&\min_\theta \max_\lambda \mathcal L(\theta,\lambda) ~ s.t.~  \lambda \geq 0, 
\end{align*}
$$

where $$\mathcal L$$ is the Lagrangian for the Lagrange multiplier method. Suppose $$C$$ is setted by us, the remaining is to find out $$\lambda$$. In contrast, we can define a 'subtracted Lagrangian' as 

$$
\begin{align*}
\mathcal L'(\theta, \lambda) &= J(\theta) + \lambda \lVert \theta \rVert_p \\ 
 &\min_\theta \max_\lambda \mathcal L(\theta,\lambda) ~ s.t.~  \lambda \geq 0, 
\end{align*}
$$

where we subtract the $$\lambda C$$ term. Now we turn the problem into finding $$C$$ by tunning the hyperparameter $$\lambda$$. These two Lagrangians are equivalent because their gradients give the same answer. 

<p align="center" style="text-align: justify">
    <img src="/images/Reguliarization-BiasVariance/L1_L2_comparison.png" width="1000" />
</p>

Fig (7).  The level curves of L1 (right) and L2 (left) regularization. ([source](https://youtu.be/mV7-j1d1Ff8)). 


The above plot shows the intersection of $$L_1$$ and $$L_2$$ norm level curves with the cost level curve of cost function. The blue dots are the optimal points for the L1 and L2 regularizations. The level curves are chosen by tunning the hyperparameter $$\lambda$$. One interesting observation is that most of the optimal points in L1 regularization lie on the feature axis. Suppose $$x_1$$ and $$x_2$$ are two features, for L1 regularization the optimal points lie on the $$x_2$$ axis, meaninig that looking at $$x_2$$ feature is enough for the problem. In other word, L1 regularization helps us to achieve dimensionality reduction by dropping the irrelevant features. 
