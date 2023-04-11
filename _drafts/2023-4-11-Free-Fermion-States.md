---
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
---

# Introduction
This is first blog for the [Zipper Entanglement Renormalization](https://arxiv.org/abs/2206.11761). In the paper, I and the collaborators used free fermion states as the example to demonstrate Zipper Entanglement Renormalization. The reason of using free fermion states is that the states is completely known in the form of density matrix. With the density matrix, its entanglement property is also known, enabling us to investigate the entanglement renormalization. 

# Free Fermion Systems and States 
The free fermion system is governed by the free fermion Hamiltonains which composed by fermionic billinears. For instance, the single-paritcle Hamiltonain of fermion hopping model 

$$ H = t \sum_i   c^{\dagger}_i  c_j + h.c.  = \sum_i h_{ij}c^{\dagger}_i  c_j $$

is a free fermion model where $t$ is the hopping amplitude. The adjecitve 'free' means that the model is completely solvable and its energy spectrum is known. The above example indeed has an analytical form of its energy band, therefore it is a free fermion Hamiltonian. The ground state of free fermion Hamiltonians are called **Free Fermion States** and this states encode the low-energy behavior pf the systems. The free fermion (ground) states are the states filling up to Fermi Level. 

$$ | \Psi \rangle = \prod_{k, E_k \leq E_F} \hat{c_k}^{\dagger} | 0 \rangle $$



# Free Fermion Correlation Matrix 
One important feature of free fermion states is the correlation function. The systems/ states are fully determined by the corresponding correlation matrix by [Wick's theorem](https://en.wikipedia.org/wiki/Wick%27s_theorem). The correlation matrix $C_{ij}$ is the ground state expectation values of the creation and annihilation operators 

$$ C_{ij} = \langle \Psi | \hat{c}_i^{~~\dagger} \hat{c}_j | \Psi \rangle .$$

The correlation matrix is computatble using single-paritcle information. For paritcle number preserving free fermion Hamiltonian, we can diagonalize the single-particle hamiltonain $$h_{ij} = U_{ik}E_k U_{kj}^\dagger$$, where $$U_{ik}$$ and $$E_k$$ are the eigenvectors and energies. We can rotate the creation/ annihilation operator to $$ \hat{d}^{~~\dagger}_{k} = \sum_{i} U_{ik} \hat{c}^{~~\dagger}_i$$ and define the ground state as 

$$ | \Psi \rangle = \prod_{k, E_k \leq E_F} \hat d^{~~\dagger}_k  | 0 \rangle , $$

where $$N_F$$ is the number of $$k$$ below the Fermi Level. Therefore, we can compute the correlation matrix in the rotated operators basis

$$
\begin{align*}
    C_{ij} = \langle \Psi | \hat c^{~~\dagger}_{i} \hat c_{j} | \Psi \rangle 
    &= \langle \Psi | U^{\dagger}_{li} \hat d^{~~\dagger}_{l} U_{jm} \hat d_{m} | \Psi \rangle \\ 
    &=  U^{\dagger}_{li} U_{jm}  \langle \Psi | \hat d^{~~\dagger}_{l} \hat d_{m} | \Psi \rangle \\ 
    &=  U^{\dagger}_{li} U_{jm}   \delta_{lm} \\
    &= \sum_{l}^{N_F} U_{jl}U^{\dagger}_{li} ~.  
\end{align*}
$$

# Entanglement Hamiltonian and Entanglement Entropy 



