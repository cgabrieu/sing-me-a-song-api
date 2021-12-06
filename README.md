## Sing me a Song API 🎧

<div align="center">
  <a href="https://sing-me-a-song-cgabrieu.herokuapp.com/recommendations/top/10">
    <img src="https://user-images.githubusercontent.com/25062334/144647668-cf0d316d-afc8-48fe-b230-62f9d44d7dfe.png" width="300px">
  </a>
    <br />
    <a href="https://sing-me-a-song-cgabrieu.herokuapp.com/recommendations/top/10">View the deploy</a>
    <br />
</div>
  
<br/>

## About

Have you ever asked someone for a song recommendation? We have a tool to make this simple. Sing me a song is an API for music recommendation. If many people vote for a recommended song, it is more likely to be randomly recommended.
    
<br/>

## Technologies

Tools that were used in the project:
<p>
  <img src='https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs'>
  <img src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express'>
  <img src="https://img.shields.io/badge/Jest-000000?style=for-the-badge&logo=jest&logoColor=c03c14"/>
  <img src='https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql'>
  <img src='https://img.shields.io/badge/eslint-000000?style=for-the-badge&logo=eslint&logoColor=472fb9'>
  <img src='https://img.shields.io/badge/npm-000000?style=for-the-badge&logo=npm'>
  <img src='https://img.shields.io/badge/Heroku-000000?style=for-the-badge&logo=heroku&logoColor=410093'>
</p>

> For more see the [package.json](https://github.com/okitauehara/sing-me-a-song-api/blob/main/package.json)

<br/>

## Getting Started

To run locally follow the steps

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Create the root folder named sing-me-a-song and access it
```sh
mkdir sing-me-a-song && cd sing-me-a-song
```
2. Clone the repo
```sh
git clone https://github.com/cgabrieu/sing-me-a-song-api.git
```
3. Install dependencies with npm
```sh
npm install
```
4. Create a database using the command below via postgres
```sh
CREATE DATABASE singmeasong;
```
5. Automatically create all necessary tables to backend repo with <a href="https://github.com/cgabrieu/sing-me-a-song-api/blob/main/dump.sql">dump</a>. 

8. Connect your backend to the database, for that, rename the .env.example to .env.dev and fill in your data.

### How to run

1. Run using the command (remember to be on the repo): 
```sh
npm run start:dev
```

## How to contribute

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`

## Developer

* [Carlos Gabriel](https://github.com/cgabrieu)

