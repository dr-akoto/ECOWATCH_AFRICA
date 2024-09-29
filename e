/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

body {
    line-height: 1.6;
}

header {
    background: #2f4f4f;
    color: #fff;
    padding: 1rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 100;
}

header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header ul {
    list-style: none;
}

header ul li {
    display: inline;
    margin: 0 10px;
}

header ul li a {
    color: #fff;
    text-decoration: none;
}

.hero {
    background: url('forest.jpg') no-repeat center center/cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
}

.hero h1 {
    font-size: 3rem;
}

.hero p {
    font-size: 1.2rem;
    margin: 10px 0;
}

.btn {
    background: #32CD32;
    color: #fff;
    padding: 10px 20px;
    text-decoration: none;
    font-size: 1.1rem;
    border-radius: 5px;
}

.btn:hover {
    background: #228B22;
}

section {
    padding: 40px 20px;
    text-align: center;
}

section h2 {
    margin-bottom: 20px;
}

footer {
    background: #2f4f4f;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    position: relative;
    bottom: 0;
    width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
    header nav {
        flex-direction: column;
    }

    .hero h1 {
        font-size: 2rem;
    }

    .hero p {
        font-size: 1rem;
    }
}
