# Chapter 7 - Functions as First-Class Objects


# Introduction and Disclaimer 

In this chapter, we will see how to implement the idea of function programming in Python and treat functions as the first-class objects. We will use the ```lambda```, ```map```, ```reduce```, and ```filter```. However, I should stress that these functions now are seldomly used. For instance, we can easily create a list under certain conditions using list comprehension instead of using the combination of ```filter``` and ```lambda``` to achieve the same goal. Besides, I should also stress that do not obsessed with the term functional programming and then learn functional programming since it looks interesting. You should learn functional programming if you really need it in particular cases.

# What are "First-Class" Objects ? 
Functions in python are the first-class objects. A first-class object can be 
* Create dynamically at runtime 
* Assigned to a vairable 
* Passed as an argument to a function
* Returned as a value from a function

There is nothing fancy here. The usual objects we seen such as ```list```, ```dict```, or ```str``` are examples of first-class objects. In Python, function is first-class objects and it behaves like the example objects we discussed. We can assign name to a function, use function as an input of other function, and return as a value from function. Here is an example to show versatility of functions 

```python 
def square(x):
    return x**2

def cube(x):
    return x**3 

funcs = {
    'square' : square,
    'cube' : cube
}

x = 2 
print(square(x)) # --> 4
print(cube(x)) # --> 8 

for func in sorted(func):
    print(func, funcs['func'](x)) #--> (cube , 8) , (square, 4)

```
This example shows there is no diffrence between functions and other first-class objects. Usually we store ```float``` or ```str``` as the values of the a given dictionary. Here we demonstrate that it is also possible to store functions as the values. 





# Function as an object

Here is an example of a factorial function.
```python 
>>> def factorial(n): 
•••     return 1 if n < 2  else n * factorial(n-1)
>>> type(factorial)
<class 'function'> 
>>> print(factorial)
<function factorial at 0x1052261f0>
>>> fact = factorial 
>>> fact 
<function fact at 0x1052261f0>
>>> fact(5)
120 
>>> map(fact, range(11))
<map object at 0x1050646a0>
>>> list(map(fact, range(11)))
[1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
```
If we are interested in the type of the factorial function, we can check it via ```type(factorial)``` and it shows that ```factorial``` (function object) is an instance in function class. Besides, we can also asign it a variable ```fact``` and call it through this name.


# Pure Functions and Side effects 
Functions are **pure** if they do not have any **side effects** that modify internal state or make other changes that aren’t visible in the function’s return value. Avoiding side effects means not using data structures that get updated as a program runs; every function’s output must only depend on its input. Here are the example codes of pure and impure functions 

```python

# Pure function 
def pure(x):
    return [i**2 for i in x ]

# Impure function 
def impure(x):
    for idx,val in enumerate(x):
        x[idx] = val**2
    return x  

xs = range(0,5)

# Pure Function Test
print(xs) # --> range(0,5)
print(pure(xs)) # --> [0, 2, 4, 6, 8]
print(xs) #--> range(0,5)

# Impure Function Test 
print(impure(xs)) # --> [0, 2, 4, 6, 8]
print(xs) # --> [0, 2, 4, 6, 8] (external variables changes, not pure!!)
```
There are some good reasons for writing our codes using functional programming fashion. For instance, functional programming is useful for reudcing bugs and in parallel programming since each function call is independent of any other function call and hence trivially parallelizable. In *Functional Programming HOWTO*, it stats the following benefits 
* Modularity 
* Ease of debugging and testing¶
* Composability


# Higher-Order Functions 
A function that takes other functions as argument is considered as a **Higher-Order Function**. In Python, ```filter```, ```reduce```, and ```map``` are some of the best known higher-order functions. However, with the list comprehension we are now less likely to use these higher-order functions. Here is an example of the comparison between list comprehension and higher-order funcitons

```python 

# Using list comprehension to create a list  containing factorial of first 6 natural numbers 
listcomp = [ factorial(n) for n in range(6)]

# Using higher order function 
high_order = list(map(factorial, range(6)))

# List under conditions 
listcomp_2 = [ factorial(n) for n in range(6) if n%2]

high_order_2 = list(map(factorial, filter(lambda n: n%2 , range(6) )))
```

From the above example, list comprehension offers us a more intuitive way to create a list under some conditions and functions. Using list comprehension increases the readability of the code. Therefore, the higher-order functions are **not as important**. In Python3, ```map``` and ```filter``` functions retuen generators so their direct substitute is now generator expressions. 


# The Lambda Function 
The ```lambda``` keyword creates an **anonymous function** in Python. Usually we use ```def``` to define a function and the ```lambda``` function is an simple syntax version. However, this simple syntax limits the ```lambda``` be pure expression since a ```lambda``` keyword cannot contain other Python statement like ```while ``` or ```try```. Here is an example of ```lambda``` function. 

```python
# From ChatGPT
add = lambda x, y: x + y
print(add(2, 3)) # Output: 5

odd = lambda n : n%2 
print([*filter(odd, range(6))]) # --> [1,3,5]

```



# Freezing Arguments with functool.partial 
```functools.partial``` is a built-in function in Python that allows you to create a new function by partially applying the arguments of an existing function. The resulting function is a callable object that behaves like the original function but with some arguments pre-specified.

```python
# From ChatGPT
def multiply(x, y):
    return x * y

double = partial(multiply, y=2)
triple = partial(multiply, y=3)

print(double(5)) # Output: 10
print(triple(5)) # Output: 15

```






# References 
* [Fleunt Python by Luciano Ramalho](https://www.amazon.com/Fluent-Python-Concise-Effective-Programming/dp/1491946008)
* [StackOverflow: What are 'first-class' objects?](https://stackoverflow.com/questions/245192/what-are-first-class-objects)
* [Functional Programming HOWTO](https://docs.python.org/3/howto/functional.html)
* [Duke University Computational Statistics](https://people.duke.edu/~ccc14/sta-663/IntroductionToPythonSolutions.html)
* [StackOverflow: Why is functools.partial necessary](https://stackoverflow.com/questions/3252228/python-why-is-functools-partial-necessary)
