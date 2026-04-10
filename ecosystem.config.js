module.exports = {
  apps : [{
    name: "graphql-app",
    script: "./index.js", // or your main file
    env: {
      NODE_ENV: "production",
      PORT: 4000
    }
  }]
}
