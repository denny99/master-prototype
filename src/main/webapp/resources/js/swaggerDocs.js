import React from 'react';
import ReactDOM from 'react-dom';
import Lincoln from 'react-lincoln';

ReactDOM.render(
    <Lincoln definitionUrl='http://localhost:8080/api/openapi.json'
             navSort='alpha'/>,
    document.body,
);