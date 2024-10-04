import random
from random import randint
from math import *

#liste de 1 à 100 aléatoire
a=[0]*100
for i in range(len(a)):
    a[i]=randint(0,100)
print(a)

#maximum de la liste
maxi = a[0]
for i in a:
    if i >= maxi:
        maxi = i
print(maxi)

#3ème maximum de la liste

#ordonner la liste

#algo dichotomique
a.sort()
print(a)

def dichotomie(t, v):
    a = 0
    b = len(t) - 1
    while a <= b:
        m = (a + b) // 2
        if t[m] == v:
            # on a trouvé v
            return True
        elif t[m] < v:
            a = m + 1
        else:
            b = m - 1
    # on a a > b
    return False

dichotomie(a, 15)