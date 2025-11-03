import re

pwd = input("Enter password: ")

score = 0
if len(pwd) >= 8: score += 1
if re.search(r"[a-z]", pwd): score += 1
if re.search(r"[A-Z]", pwd): score += 1
if re.search(r"\d", pwd): score += 1
if re.search(r"[!@#$%^&*]", pwd): score += 1

if score == 5:
    print("Strong!")
elif score >= 3:
    print("Good.")
else:
    print("Weak!")
