from typing import overload

def SaisieChiffre() -> int:
    try:
        i = int(input("Donnez un chiffre: "))
    except Exception as e:
        print(e)
        i=0
    finally:
        return i

#print(SaisieChiffre())

class Cours():
    sujet = ""
    date = ""
    nbEleve = 0

    def __init__(self, sujet):
        self.sujet = sujet

   # pourquoi pas? @overload
    def __init__(self, sujet, date, nbEleve):
        self.sujet = sujet
        self.date = date
        self.nbEleve = nbEleve

    def __str__(self):
        return ("Cours de " + self.sujet)

    def __menu__(self):
        print(int(input("Créez un menu: ")))

cours1 = Cours("Histoire", "30_09", 23)
cours2 = Cours("Géo", "31_09", 24)
print(cours1)

listeCours= [cours1,cours2]

a = int(input("Choisissez une option:\n1.Afficher les cours\n2.Ajouter des cours\n"))
if a == 1:
    for cours in listeCours:
        print(cours)
if a == 2:
    print("Format: Sujet(ex:Histoire),Date(ex:30_09),Nb_Eleves(ex:24)\n")
    nom = input("Nom de cours:")
    date = input("Date:")
    nb = int(input("Nombre d'élèves:"))
    cours=Cours(nom,date,nb)

#menu pour afficher et ajouter des cours
#cours -> stockés dans une liste
#pour créer un cours, il faut le sujet, la date et le nb d'élèves
#Tuple qui contient les sujets possible pour le cours 