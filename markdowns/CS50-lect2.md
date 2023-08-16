# Lecture 2 - Arrays

# Disclaimer 
In last lecture, we claim that we use ```make``` to compile the code. However, this statement is not correct. In fact, ```make``` is not the actual compiler. The actual compiler in MacBook is ```clang```. Now we can use ```clang``` to compile the ```hello_world``` code



# Clang and Linker 
>$ clang hello.c 
>
>$ ./a.out

We run the code by typing ```./a.out``` in terminal. Clerly, ```a.out``` is not a good name since we cannot get any information from looking at this name. We can name the executable by adding more argumment in ```clang```

>$ clang -o hello hello.c

where ```-o``` means the output. There is one more difference between ```make``` and ```clang``` when we are calling external libraries. For instance, ```cs50.h``` is an external library and we need to use ```make install``` to install the file inside ```/usr/local```. In ```hello_cs50``` example we use the function from ```cs50.h``` header 

```c
#include <cs50.h> 
#include <stdio.h> 

int main(){
  string name = get_string("What's your name?");
  printf("hello, %s\n", name);
}
```
There is no erro message if we use ```make``` to compile the code. However, using ```clang``` returns an error message saying that 

```c
Undefined symbols for architecture arm64:
  "_get_string", referenced from:
      _main in hello_CS50-4406f3.o
ld: symbol(s) not found for architecture arm64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
``` 
Even we add the ```cs50.h``` header inside the code, there is not sufficient information to teach the compiler where the location of ```cs50.h``` file is. To solve this problem, we need to add ```-lcs50``` to the ```clang``` command in order to compile the program

> $ clang -o hello hello.c -lcs50

Long story short, using ```make``` saves us some keystrokes but if we prefer more be in control we use ```clang```. 


# 4 Steps to convert source code to machine code

There are four steps in converting the source code to machine code

* Preprocessing 
* Compiling 
* Assembling 
* Linking 

## Preprocessing 
Have you ever wonder where are the location of the header files? If we look at directory where the code in, we do not see any file called ```cs50.h``` or ```stdio.h```. The code can still be compiled without any problem

```c
#include <cs50.h>
#include <stdio.h>
```
This is the **preprocessing** step. These header files are in the ```/usr/local/include``` directory and the compiler will look the header files in there. Once clang sees the header files, it will copy and paste the content to our source code but we don't see it on the screen. 

## Compiling and Assembling

In compiling step, the compiler converts the source code into **Assembly language**, which is a language that CPU can understand. After that, the compiler needs to converts the assembly code to **machine code** which is full of 0's and 1's during the **assembling step**.


## Linking 
In assembling step, the compiler turns our code into machine code. Since we include ```stdio.h``` and ```cs50.h``` in our code, the compiler also turns these header files into machine codes and combine the resulted machine code to our machine code. This is the reason of why we need to include ```-lcs50``` as ```clang``` argument.




# Array

There is no generic funciton to compute the size of an array in C. 

```c 
#include <cs50.h>
#include <stdio.h>

int N = 3;

float average(int array[]){
  int sum = 0;
  for (int i = 0; i<N;i++ ){
    sum += array[i];
  }
  return sum/ (float) N;
}

int main(){
  int i = 0;
  int scores[N];
  for (i=0; i<N; i++){
    scores[i] = get_int("Score:");
  }

  printf("The average is equal %f\n", average(scores));
}
```



# String 
String is an array of ```char```. Suppose we have a string in C like

```c
#include <stdio.h>

int main() {
  char str[] = "Hello, world!";

  printf("%s", str);

  return 0;
}
```
We initiate the string ```str``` into form of array. Therefore, if we choose ```str[0]``` then it will returns ```H``` since ```str[0] = H``` in array language. 
