// use esversion: 6
import React, { Component } from 'react';
import './App.css';

import json2md from 'json2md';
import Form from "react-jsonschema-form";

const {
  REACT_APP_SCHEMA,
  REACT_APP_WEBHOOK_URL,
  REACT_APP_WEBHOOK_HOST= '',
  REACT_APP_MARKDOWN_MAPPING,
  REACT_APP_CHANNEL,
  REACT_APP_USERNAME
} = process.env;

const schema = JSON.parse(REACT_APP_SCHEMA);
const mdMap = JSON.parse(REACT_APP_MARKDOWN_MAPPING);

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number]
        : match
      ;
    });
  };
}

const formatData  = (form) => ({key, el, format, ...spec}) => {
  if (key) {
    return { [el]: format.format(form[key]) };
  }
  if (spec.table) {
    const rows = [];
    spec.table.rows.forEach(
      (key, i) => form[key].forEach(
        (s, j) => {
          if(!rows[j]) {
            rows.push(spec.table.rows.map(x => ''));
          }
          rows[j][i] = s;
        })
    );
    return { table: { ...spec.table, rows } };
  }
  return spec;
};

function postData({formData: form}) {
  const mappedForm = mdMap.map(formatData(form));

  const data = {
    channel: REACT_APP_CHANNEL,
    username: REACT_APP_USERNAME,
    text: json2md(mappedForm)
  };

  fetch(
    REACT_APP_WEBHOOK_HOST + REACT_APP_WEBHOOK_URL, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'no-cors'
    }).then(r => window.confirm('Form has been submitted - Submit a new report?') && window.location.reload());
}

const { log } = console;

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Form schema={schema}
              onChange={log("changed")}
              onSubmit={postData}
              onError={log("errors")}
              />
      </div>
    );
  }
}

export default App;
