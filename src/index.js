import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import Header from './components/common/Header'
import List from './components/list/List'
import Detail from './components/detail/Detail'
import NotFound from './components/notfound/NotFound'

const colours = {
  // Text
  white:             "#fff",
  blueGray:          "#9cb3c9",
  indigo:            "#d64d96",
  green:             "#3cd483",

  // Elements
  blue:              "#1f364d",
  blueDarker:        "#0f273d",
  blueDarkerDarker:  "#0c2033",
  blueLighter:       "#4997e5",
  blueLighterGrayer: "#457cb2",
}

const theme = {
  priTxt: colours.white,
  secTxt: colours.blueGray,
  errTxt: colours.indigo,

  raisedTxt: colours.green,
  fallenTxt: colours.indigo,

  mainEl: colours.blueDarker,
  mainEl2: colours.blueDarkerDarker,
  mainHigh: colours.blue,

  contrastedEl:      colours.blueLighter,
  contrastedHoverEl: colours.blueLighterGrayer,
}

const GlobalStyle = createGlobalStyle`
  /* Load Open Sans font from Google Fonts */
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400');

  /*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */
  button,hr,input{overflow:visible}audio,canvas,progress,video{display:inline-block}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}

  /* Remove close icon from input on IE */
  input::-ms-clear {
    display: none;
  }
  
  body {
    background-color: ${props => props.theme.mainEl2};
    font-family: 'Open Sans', sans-serif;
    color: ${props => props.theme.priTxt};
    letter-spacing: .5px;
    font-size: 16px;
    font-weight: 300;
  }
`

const App = () => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle/>
        <Header/>
        <Switch>
          <Route exact path="/" component={List}/>
          <Route path="/currency/:id" render={(props) => <Detail currency={props.match.params.id}/>}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </ThemeProvider>
  </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById("root"))