---
title : Research Interests
layout : single
classes : wide 
author_profile : true 
permalink: /interests/
---

## Entanglement Renormalization
 Entanglement renormalization offers us a way to use less degrees of freedom to describe quantum states effectively by erasing short-range entanglement. The daily life analogy of entanglement renormalization is image compression. With image compression, we can store images with less storage by erasing the fine detail of the original images. This kind of effectiveness is as same as the entanglement renormalization. 

With the entanglement renormalization, we believe that the important information or the defining features of the quantum states are stored within a few degrees of freedom, and others are redundant. 

<!-- Image compression Fig -->
<p align="center" style="text-align: justify">
    <img src="/assets/images/image_compression.svg" />
    Fig (1).  Example of image compression. (Left) The original picture. (Right) The compressed picture with less storage consumption. With the use of image compression, the fine details of the original image are erased. As a result, the eyes, hair, and hat are blury in the compressed image. Although some parts are blury, the compressed image still recognizable as a woman. The defining features are still preserved. The entanglement renormalization is similar to image compression in this sense.
</p>

<!-- ![](/assets/images/image_compression.pdf )
*Fig (1).  Example of image compression. (Left) The original picture. (Right) The compressed picture with less storage consumption. With the use of image compression, the fine details of the original image are erased. As a result, the eyes, hair, and hat are blury in the compressed image. Although some parts are blury, the compressed image still recognizable as a woman. The defining features are still preserved. The entanglement renormalization is similar to image compression in this sense.* -->




## Tensor Network States 
Tensor Network States (TNS) is a numerical tool to obtain an effective description for large-size tensors, which are the high-dimensional generalization of vectors and matrices. The TNS decomposes a large-size tensor to the product of multiple small-size tensors/matrices. In this sense, we use less degree of freedom to describe the original tensor, increasing the computational efficiency. [Matrix Product States (MPS)](/MPS/) and [Multiscale Entanglement Renormalization Ansatz (MERA)](/MERA/) are two examples of TNS on one dimension. 

## Matrix Product States (MPS)
<p align="center" style="text-align: justify">
    <img src="/assets/images/MPS.svg">
    Fig (2). The Matrix Product States (MPS). The tensor  $$ C^{i_1, \dots, i_N} $$ consists of large number of parameters $$ \sim 2^{20} $$. The MPS offers us a decomposition of the original tensor to multiple  matrices  $$ A^{i_\alpha} $$ with much smaller sizes. 
</p>


## Multiscale Entanglement Renormalization Ansatz (MERA)
<p align="center" style="text-align: justify">
    <img src="/assets/images/MERA.svg">
    Fig (3). The Multiscale Entanglement Renormalization Ansatz (MERA). Similar to the spirit of MPS, it decomposes a large tensor to multiple matrices with smaller sizes. However, it does one small steps to obtain the effective description using the physical process **Entanglement Renormalization** we discussed before. 
</p>

