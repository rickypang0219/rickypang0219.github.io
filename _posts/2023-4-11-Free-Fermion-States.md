---
title: Free Fermion States and Its Entanglement Properties 
layout: single 
classes : wide
author_profile: true
read_time : true
share : true 
category : Entanglement Renormalization 
tags: 
    - Entanglement Renormalization  
    - Free Fermion States
---


<!-- ---
layout: posts
classes: wide 
title: Free Fermion States and Its Entanglement Properties 
read_time : true 
author_profile : true
share: true
category : Entanglement Renormalization 
tags: 
    - Entanglement Renormalization  
    - Free Fermion States
--- -->

# Introduction
This is first blog for the [Zipper Entanglement Renormalization](https://arxiv.org/abs/2206.11761). In the paper, I and the collaborators used free fermion states as the example to demonstrate Zipper Entanglement Renormalization. The reason of using free fermion states is that the states is completely known in the form of density matrix. With the density matrix, its entanglement property is also known, enabling us to investigate the entanglement renormalization. 

# Free Fermion Systems and States 
The free fermion system is governed by the free fermion Hamiltonains which composed by fermionic billinears. For instance, the single-paritcle Hamiltonain of fermion hopping model 

$$ H = t \sum_i   c^{\dagger}_i  c_j + h.c.  = \sum_i h_{ij}c^{\dagger}_i  c_j $$

is a free fermion model where $t$ is the hopping amplitude. The adjecitve 'free' means that the model is completely solvable and its energy spectrum is known. The above example indeed has an analytical form of its energy band, therefore it is a free fermion Hamiltonian. The ground state of free fermion Hamiltonians are called **Free Fermion States** and this states encode the low-energy behavior pf the systems. The free fermion (ground) states are the states filling up to Fermi Level. 

$$ | \Psi \rangle = \prod_{k, E_k \leq E_F} \hat{c_k}^{\dagger} | 0 \rangle $$



# Free Fermion Correlation Matrix 
One important feature of free fermion states is the correlation function. The systems/ states are fully determined by the corresponding correlation matrix by [Wick's theorem](https://en.wikipedia.org/wiki/Wick%27s_theorem). The correlation matrix $$C_{ij}$$ is the ground state expectation values of the creation and annihilation operators 

$$ C_{ij} = \langle \Psi | \hat{c}_i^{\dagger} \hat{c}_j | \Psi \rangle .$$

The correlation matrix is computatble using single-paritcle information. For paritcle number preserving free fermion Hamiltonian, we can diagonalize the single-particle hamiltonain $$h_{ij} = U_{ik}E_k U_{kj}^\dagger$$, where $$U_{ik}$$ and $$E_k$$ are the eigenvectors and energies. We can rotate the creation/ annihilation operator to $$ \hat{d}^{~~\dagger}_{k} = \sum_{i} U_{ik} \hat{c}^{~~\dagger}_i$$ and define the ground state as 

$$ | \Psi \rangle = \prod_{k, E_k \leq E_F}^{N_F} \hat d^{\dagger}_k  | 0 \rangle , $$

where $$N_F$$ is the number of $$k$$ below the Fermi Level. Therefore, we can compute the correlation matrix in the rotated operators basis

$$
\begin{align*}
    C_{ij} = \langle \Psi | \hat c^{\dagger}_{i} \hat c_{j} | \Psi \rangle 
    &= \langle \Psi | U^{\dagger}_{li} \hat d^{\dagger}_{l} U_{jm} \hat d_{m} | \Psi \rangle \\ 
    &=  U^{\dagger}_{li} U_{jm}  \langle \Psi | \hat d^{\dagger}_{l} \hat d_{m} | \Psi \rangle \\ 
    &=  U^{\dagger}_{li} U_{jm}   \delta_{lm} \\
    &= \sum_{l}^{N_F} U_{jl}U^{\dagger}_{li} ~.  
\end{align*}
$$

# Entanglement Hamiltonian and Entanglement Entropy 
The correlation matrix and the entanglement entropy is somehow related. Intuitively, the entnaglement is stronger when things are more correlated. In free fermion context, this relation is proven by [Chung and Peschel](https://arxiv.org/abs/cond-mat/0103301). The idea is to relate the density matrix with the correlation matrix. Recall that in quantum mechanics, we can expresse the physical observables using density matrix 

$$ \langle \hat{O} \rangle = \text{Tr} ( \hat{O} \hat{\rho} ) .$$

Similarly, the correlation by defintion is a physical observable. Therefore, we can express the correlation matrix using density matrix 

$$ \langle \Psi | \hat c^{\dagger}_i \hat c_j | \Psi \rangle = \text{Tr} ( \hat c^\dagger_i  \hat c_j \hat{\rho} ) .$$

We are interested in the bipartite quantum entanglement entropy. We first specify the bipartite system (e.g. subregion $$R$$ versus the rest) and find out the corresponding reduced density matrix $$\rho_R$$ for the computation of entanglement entropy. In free fermion context, the reduced density matrix is related with the restrcited correlation matrix of a subregion $$(C_R)_{ij}$$ by 


$$ (C_R)_{ij} = \text{Tr} ( \hat c^\dagger_i  \hat c_j \hat{\rho}_R ) ~~,~~ i,j \in R. $$

For the reduced density matrix, it should be a free fermion operator in order to satisfy the Wick's theorem. We can write the reduced density matrix as the form of quadratic fermionic bilinear 

$$ \hat \rho_R = \frac{1}{Z} e^{-\hat H_{R}} ~~, \hat H_{R} = \sum_{ij} h_{R,ij} \hat c^{\dagger}_i \hat c_j , $$

where $$Z = \text{Tr} (e^{\hat H_{R}} ) $$ is the normalization constant and $$H_{R}$$ is the **Entnaglement Hamiltonian**. As the single-particle entanglement Hamiltonian $$h_{R,ij}$$ is a hermitian matrix, it has the following diagonalization $$h_{R} = U E U^\dagger $$ and we can rotate the fermionic operator as before $$d^{\dagger} = U c^\dagger$$. Therefore in the eigenbasis, we can simplify the reduced density matrix

$$
\hat 	\rho_{R} = \frac{1}{Z} \exp(- \sum_{k} E_{k} \hat d^{\dagger}_{k} \hat d_{k} ) = \frac{1}{Z} \prod_{k} \exp( -  E_{k}  \hat d^{\dagger}_{k} \hat d_{k}  ) ~.
$$

The normalization constant $$Z = \prod_{k} (1 + e^{-E_{k}} )  $$ ensures the trace of reduced density operator equals one( i.e. $$\text{Tr}( \hat \rho_{R}) = 1 $$). Then we can convert everything in this basis and the restricted correlation matrix becomes 

$$
 \begin{align*}
 	(C_{R})_{ij}  &= \frac{1}{Z} \text{Tr}_{R} \Bigg(\sum_{\alpha, \beta} U_{i \alpha} U^{*}_{j \beta } \hat d^{\dagger}_{\alpha} \hat d_{\beta} \exp( -\sum_{k} E_{k} \hat d^{\dagger}_{k} \hat d_{k}   ) \Bigg) \\ 
 	&=\sum_{\alpha} U_{j \alpha} \frac{e^{-E_{\alpha}}}{1+e^{-E_\alpha}} U^{*}_{i \alpha} \\ 
 	&= \Big(\frac{1}{e^{h^R} + 1 } \Big)_{ji} ~.
 \end{align*}
$$

Therefore, we relate the correlation matrix with the entanglement Hamiltonian. Besides, in second line we use the fact that the product 

$$
\frac{1}{Z} \text{Tr}_{R} \Bigg(\sum_{\alpha, \beta}  \hat d^{\dagger}_{\alpha} \hat d_{\beta} \exp( -\sum_{k} E_{k} \hat d^{\dagger}_{k} \hat d_{k}   ) \Bigg) = \langle \hat d^\dagger_{\alpha} \hat d_{\beta} \rangle = \delta_{\alpha \beta}  \langle \hat d^\dagger_{\alpha} \hat d_{\alpha} \rangle = \delta_{\alpha \beta} \frac{e^{-E_{\alpha}}}{1+e^{-E_\alpha}} ~,
$$

is simply the expectation value of the number operator. From statistical physics, the expectation values of the number operator to the mode is $$\frac{e^{-E_{\alpha}}}{1+e^{-E_\alpha}}$$. The above equation connects single-particle sector of entanglement Hamiltonian $$h^{R}$$ and the restricted correlation matrix. In other words, we have the matrix form  
\begin{equation}
	h^{R^{T}} = \ln \Bigg( \frac{1- C_R}{C_R} \Bigg) ~.
\end{equation}

Last but not least, with the entanglement Hamiltonian, we can to compute the entanglement entropy. As introduced in previous chapter, the von Neumann entropy is defined as 

$$
S_{R} = -\text{Tr}(\hat \rho_{R} \ln \hat \rho_{R})  = -\sum_{i} \big( \xi_{i} \ln \xi_i +  (1-\xi_i ) \ln ( 1-\xi_i)  \big) ~,
$$

where $$\xi_i$$'s are the eigenvalue of the restricted correlation matrix $$C_{R}$$. 
