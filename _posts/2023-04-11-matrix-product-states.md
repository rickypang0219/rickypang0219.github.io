---
title: (ZER Series) Matrix Products States 
layout: single 
classes : wide
author_profile: true
read_time : true
share : true 
category : Zipper Entanglement Renormalization
tags: 
    - Entanglement Renormalization  
    - Matrix Product States  
    - Condensed Matter Theory 
permalink: /MPS/
---


Consider a 1D lattice with $$N$$ sites, and for each site, there is a $$d$$ dimensional local Hilbert space $$\mathbb{V}$$ spanned by a set of local states $$ \{ \vert i \rangle \} $$,  we can write down an expression for a generic quantum state living in the full many-body Hilbert space $$\mathcal{H}$$ as

$$
 | \Psi \rangle = \sum_{i_{1} \cdots  i_{N} } C^{i_{1} i_{2} \cdots i_{N} } | i_{1} i_{2} \cdots i_{N} \rangle~, | \Psi \rangle \in \mathcal{H} = \mathbb{V}^{\otimes N},
$$

 where $$C^{i_{1} i_{2} \cdots i_{N} }$$ is an exponentially large tensor containing the coefficients to specify the state. The summation is summing over all possible configurations of the tensor products of each local state. Inspired by the concepts in Schmidt's decomposition, the modes carrying short-range entanglement have relatively small Schmidt values, in which their contribution to the entanglement entropy is negligible. The MPS seeks to discard the SRE modes by examining the bipartite systems iteratively. To apply the Schmidt decomposition on a tensor, we first need to specify the grouping of the indices to have the sense of a bipartite system. For instance, we can group the indices $$(i_2, i_3, \cdots, i_N) $$ together and treat them as one index while leaving $i_1$ alone. Therefore, we can reshape a $d^N$ dimensional tensor $$C_{i_{1} i_{2} \cdots i_{N} }$$ to $$(d \times d^{N-1} )$$ dimensional matrix $$C^{i_1, (i_2, \cdots, i_N)}$$ and we are safe to apply SVD. Physically, reshaping a tensor offers us a sense of the bipartite systems. As the tensor $$C_{i_{1} i_{2} \cdots i_{N} }$$ is written in terms of the local basis $$( \{ \vert i_1 \rangle, \cdots , \vert i_L \rangle \} )$$, the such reshaping process can be viewed as a separation of the whole system into two parties, in which the $$1$$-st site versus the rest in this example.   


By reshaping the tensor to matrix, we are now safe to perform Schmidt's decomposition to the tensor $$C_{i_{1} i_{2} \cdots i_{N} }$$

$$
 	C_{i_{1} i_{2} \cdots i_{N} } \xrightarrow{\text{Reshape }}
 	 C_{i_{1},  (i_{2}, \cdots ,i_{L}) }~ \stackrel{\text{SVD}}{=} ~\sum_k^r U_{i_1 k} \Sigma_{k} V^{\dagger}_{k, (i_2, \cdots ,i_N) } ,
$$

<p align="center" style="text-align: justify">
    <img src="/assets/post_images/MPS/canonicalization.svg">
    Fig (1). The canonical form of MPS via successive SVD(Schmidt’s Decomposition)
</p>


where $r $ is Schmidt's rank, encoding the number of non-zero Schmidt's values, and $r = d$ as its values is always determined by the system with smaller dimension. We refer the Schmidt's rank as \textbf{bond dimension} as it encodes the Hilbert space dimension of the bond connecting different tensors, depicted in above figure. We can iterate the Schmidt's decomposition to tensor $$\Sigma_{k}V^{\dagger}_{k, (i_2, \cdots ,i_N)}$$ and seek a more efficient description for the entire state. For simplicity, we rename the following matrices and tensor

$$
	U_{i_1 k} = A^{ i_1}_{k} ~,~ \Sigma_{k}V^{\dagger}_{k, (i_2, \cdots ,i_N)} = C^{k, i_2, \cdots ,i_N}. 
$$

By iterating the Schmidt's decomposition on $$C^{k, i_2, \cdots ,i_N}$$, we simply reshape the tensor into $C^{(k, i_2,), (i_3 \cdots ,i_N)}$ and compute the SVD using the above procedure. The whole process of successively applying SVD is called canonicalization of MPS and it is depicted in Fig.(X) Now we decompose an exponentially large tensor $$C^{i_{1} i_{2} \cdots i_{N}}$$ to a products of small tensor $$A^{i_j}$$ by

$$
	C^{i_{1} i_{2} \cdots i_{N}} \approx \sum_{\{k \} = k_1, k_2, \cdots, k_N} A^{i_1}_{k_1} A^{i_2}_{k_1, k_2} \cdots A^{i_N}_{k_N} = ( A^{i_1} A^{i_2} \cdots A^{i_N})_{\{k\}}, 
$$

where different $k_i$'s encode corresponding bond dimensions of the MPS. The maximum bond dimension is $$d^{N/2}$$ due to the nature of SVD decomposition. Originally the dimension of the tensor $$C^{i_{1} i_{2} \cdots i_{N}}$$ is $d^N$. Now the MPS description uses $N$ smaller tensors to describe the same states. However, the number of degrees of freedom in MPS description is larger than $$d^{N}$$. The intrinsic degrees of freedom of the MPS in general is larger than $$C^{i_1 \dots i_n}$$ since MPS decomposition is not unique. The MPS discerption does not change by inserting $$X X^{-1} = 1$$ between matrices $$A^{i_n}$$ and $$A^{i_{n+1}}$$ for instance. Based on this observation, we know that the MPS in general can describe all the states but in an inefficient manner. However, the area law states admit an effective description in MPS description.


