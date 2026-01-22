# 🚀 INITIAL LANGUAGE (InitiaL)

![Logo](icons/il.ico)

[Version Française](readme_fr.md)

**Initial Language** (or **InitiaL**) is an academic programming language specifically designed to introduce French-speaking beginners to the fundamental concepts of computer science.

By using an intuitive syntax based on the French language, it allows students to focus on algorithmic logic without being hindered by the English language barrier.

---

## 🌟 Key Highlights

- **🗣️ French Syntax**: Use simple keywords like `si` (if), `alors` (then), `boucler` (loop), `fonction` (function), etc.
- **⚙️ Power Under-the-hood**: Instantly translates code into **AutoHotkey (AHK)** for smooth execution on Windows.
- **🛠️ Complete Environment**: Planned integration with Notepad++ for optimal syntax highlighting and auto-completion.
- **📦 Easy Compilation**: Turn your `.il` scripts into standalone `.exe` executables.

---

## 🛠️ Technical Stack

The project is built on several key technologies:

- **Node.js (v12+)**: The interpreter/translator engine (written in JavaScript).
- **AutoHotkey (v1.8)**: The target language used for final execution.
- **Moo.js**: Used for tokenization and lexical analysis.
- **Notepad++ & SciTE4AutoHotkey**: Recommended tools for development.

---

## 📦 Installation

The project includes an installer (`Setup.exe`) that automatically configures the environment:

1. Run `Setup.exe`.
2. The installer will check and install if necessary:
   - Node.js v12
   - AutoHotkey
   - Notepad++ (v7.8) with InitiaL configurations.
3. Language files will be installed in `C:\Initial_Language\`.

---

## 💻 Code Example

Here is what a simple program looks like in **InitiaL**:

```initial
#mode console
#identation non

DEBUTPROGRAMME: 'INITIAL_DEMO'

    fonction PRINCIPAL fait
        ecrire: 'Welcome to Initial Language!';

        var chaine nom eg ''
        lire: nom, 'Please enter your name: ';

        si nom dif '' alors
            ecrire: "Hello " + nom;
        fsi

        boucler 5 fois
            ecrire: "Counter: " + IC_index;
        fboucle
    ff

    pause, 0

FINPROGRAMME
```

---

## 🚀 Usage

Once installed, you can interact with your `.il` files via the context menu (right-click):

- **Run the program**: Directly launches your script.
- **Compile the program**: Generates an `.exe` file via the AHK compiler.
- **Edit the program**: Opens the file in Notepad++ with syntax highlighting.

### Command Line

You can also manually launch the translator:

```bash
node modules\main.js <file_path>.il [noComp|yesComp]
```

---

## 📂 Project Structure

- `modules/`: Core of the interpreter (syntax checker, translator, etc.).
- `exemples/`: Collection of scripts to learn the basics.
- `configs/`: System configuration files.
- `icons/`: Graphic resources.
- `doc/`: Additional documentation.
- `syntax/`: Definition files for syntax highlighting (Notepad++).

---

## 📝 Credits & License

Developed by **Ether Solutions** (Copyright 2020).
_Designed for education and learning algorithms._
