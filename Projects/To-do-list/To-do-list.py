# todo_list.py

tasks = []

while True:
    print("\n1. Add Task\n2. View Tasks\n3. Delete Task\n4. Exit")
    choice = input("Enter choice: ")

    if choice == "1":
        task = input("Enter task: ")
        tasks.append(task)
        print("Task added!")
    elif choice == "2":
        print("\nYour Tasks:")
        for i, t in enumerate(tasks, 1):
            print(f"{i}. {t}")
    elif choice == "3":
        for i, t in enumerate(tasks, 1):
            print(f"{i}. {t}")
        num = int(input("Enter task number to delete: "))
        if 0 < num <= len(tasks):
            print(f"Deleted: {tasks.pop(num - 1)}")
        else:
            print("Invalid number!")
    elif choice == "4":
        print("Goodbye!")
        break
    else:
        print("Invalid option!")
