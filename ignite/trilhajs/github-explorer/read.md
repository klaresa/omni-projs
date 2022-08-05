    "yw": "yarn webpack"

- roda o script para gerar o bundle.js. Para dar refresh nas mudanças é necessário rodar o script novamente


## hot reload
- Adicionar o **webpack-dev-server**
    
        yarn add webpack-dev-server
    
- adiciona```html-webpack-plugin```  às configurações do webpack para observar as modificações no srx/index.jsx e recria o bundle.js

```  
devServer: {
contentBase: path.resolve(__dirname, 'public', 'index.html')
}, // aponta para o html estático
plugins: [
    new HtmlWebpackPlugin({
     template: path.resolve(__dirname, 'public', 'index.html')
    })
],
```

- roda com **```yarn webpack serve```**


    
## Source map

    devtool: 'eval-source-map',
    
- A funcionalidade é para ver com precisão onde está o erro


## Webpack development e production

a var ```env``` ajuda a perceber se o ambiente é dev ou prod nas configurações do webpack.congif.js:

      mode: isDevelopment ? 'development' : 'production',
      devtool: isDevelopment ? 'eval-source-map' : 'source-map',

Para criar a var NODE_ENV instale ```yarn add cross-env -D```
Aí vc pode criar uma parte para facilitar o rodar scripts no package.json:

    "scripts": {
        "yw": "yarn webpack",
        "dev": "webpack serve",
        "build": "cross-env NODE_ENV=production webpack"
    },


## Entendendo arquivos CSS pelo loader
Da mesma forma que existe a regra para entender js e jsx precisa de um loader para entender css com ```yarn add style-loader css-loader -D```. Nas rules do webpack.config.js adicione mais uma regra:
        
    {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader'],
    },

Se quiser adicionar um pre-loader de css como o sass, é só baixar ```yarn add node-sass sass-loader -D``` o loader e adicionar às regras:
    
    {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    },
