module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { //essa config eh para n precisar importar o react no index.js
      runtime: 'automatic'
    }]
  ]
}

