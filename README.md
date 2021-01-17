# Getting Started with this project

This project was bootstrapped (AKA we're using a template) with [Create React App](https://github.com/facebook/create-react-app).
You don't actually need to know React to get some front end elements to display on the screen.

# Getting the Project Set Up Locally

Github makes use of "distributed systems" for code management. This essentially means that every person working on the code creates a copy of the main code.

# The General Steps
*Note that elements wrapped inside* `<...>` *are meant to be fully replaced, including the brackets*

## 1 - Launch VSCode
## 2 - Open a new Window (File > New Window)
## 3 - Open a new Terminal (Terminal > New Terminal)

- You'll be directed to your root folder/directory. Mine looks like: `C:\Users\Jenny>`
- However, I want to store the "Hired" code folder somewhere else, for example: `C:\Users\Jenny\Documents\igen330`
- I have to change folder/directory to get from `C:\Users\Jenny>` to `C:\Users\Jenny\Documents\igen330`

So, to get from `\Jenny` to `\Jenny\Documents`, I can type:

```
cd Documents
cd igen330
```
*Note: cd stands for "change directory"*

Alternatively, I could've just typed:

```
cd Documents\igen330
```

## 4 - Make a Clone of the Code Stored on Github

The next step is to make a copy of all that code stored on Github. Find the repository link and type in:

```
git clone <Link of this respository>
```

If you check in your File Explorer (Windows) or Finder (Mac), you'll see that a folder called `hired` and all its files are stored exactly where you want.

So now you want to actually work with this code within VSCode.
```
cd hired
code -r .
```

That first command, `cd hired`, changes your current folder to the one you just cloned. The second command, `code -r .`, opens this folder up in your current VSCode window so you can work with it.

## 5 - Install Dependencies

You'll need to have node.js installed for this step. If you don't, you can download it at this [link](https://nodejs.org/en/).

Don't quote me, but dependencies are just things that your code relies on to run properly. For example, if we're using a library such as Material-UI, which has a bunch of cool pre-built components and styling, we're going to need to "install" that library on our computer to make the code run. You might be wondering why we can't just include these libraries as part of the main code stored on Github, and I think the answer to that question is that it takes up unecessary space on the cloud (server).

```
npm install
```

- npm: node package manager (helps install useful libraries and runs our app on our server)
- i: stands for "install"
- create-react-app: name of the package/library we want to install

## 6 - Build and Run the App on Your Local Server

Basically, as long as you have the code and those libraries installed on your computer, you can run the code and see it live. This is NOT available to anyone but yourself (or I guess your computer), so any changes you make will only be reflected on your local server unless you merge your code with the main code.

Start by building/compiling the code:

```
npm start
```

Your code will now start running on your local server. More specifically, projects made with `create-react-app` will run on `localhost:3000` by default.

## 7 - Watching Changes Update Live

Cool! So the code is live within your machine. Try changing something. For example, if you navigate to `src\components\dashboard\dashboard.js`, you can change the `Edit me!` text.

Hit save, and watch the change carry over to your `localhost:3000`

## 8 - Push Your Code 

Now that you've edited the code to your heart's content, it's time to "push" it back with the main code.

To do this, it's important to highlight the **Source Control** menu option in VSCode.

![VSCode Source Control Button](https://scontent.fyyc2-1.fna.fbcdn.net/v/t1.15752-9/125253189_416578552709045_4270073222403703330_n.png?_nc_cat=106&ccb=2&_nc_sid=ae9488&_nc_ohc=JI8n9twudXQAX_cRPq_&_nc_ht=scontent.fyyc2-1.fna&oh=c52fab60b8a7f66364e512be0a856bf1&oe=5FDBCB5F)

In my screenshot, you can see that I made changes to the `App.js`, `package-lock.json`and `package.json` files. Let's say that I **ONLY** want to upload the changes I made to `App.js`. To do this: 

1. Hover over it and click on the `+` symbol to **stage** it
2. Type a descriptive message of the change inside the `Message` box (i.e "Changed title text")
3. Click on the checkmark button to **commit** the change. (Commit essentially means that you want to apply this change to your local repository)

Now you can **push** these changes to the main code. To do so, go back to your Terminal:
```
git push <...> <...>
```
But what goes inside the two brackets?

## 9 - Main and Branches

A great feature of Github is that it allows us to make a separate "branch" of our main code.

![Github branch image](https://nvie.com/img/fb@2x.png)

In the above image, the pink points represent a branch, derived from the main code. Maybe you wanted to test out a feature but didn't want to break the main code while testing it out? Make a new branch and **merge** it back with the main branch once you're ready. 

For the purposes of our tutorial, create a new branch and push your code to this new branch named after yourself.
```
git checkout -b <branch-name>
git push -u origin <branch-name>
```

`git checkout -b <branch-name>` both creates and transports you to the new branch you create. `git push -u origin <branch-name>` pushes your code to the branch you want.
