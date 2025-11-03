import random

computer = random.choice([-1, 0 , 1])
youstr = input("Enter your choice: ")
youDict = {"s": 1, "w": -1, "g": 0}
reverseDict= {1: "Snake", -1: "Water", 0: "Gun"}

you = youDict[youstr]

print(f"You chose {reverseDict[you]}\nComputer chose {reverseDict[computer]}")

if(computer == you):
   print("Its a draw\nGame Over.")

else:
    if(computer == -1 and you ==1):
      print("You Win!\nGame Over.")

    elif(computer == -1 and you == 0):
        print("You Lose!\nGame Over.")

    elif(computer == 1 and you == -1):
        print("You Lose!\nGame Over.")

    elif(computer == 1 and you == 0):
        print("You Win!\nGame Over.")

    elif(computer == 0 and you == -1):
        print("You Lose!\nGame Over.")

    elif(computer == 0 and you == 1):
        print("You Lose!\nGame Over.")

    else:
       print("Something went wrong")
