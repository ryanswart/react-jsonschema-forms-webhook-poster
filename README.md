This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). [Here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) is a guide to Create React App usage

## Mattermost / Slack Form Poster

This simple React App takes a Json Schema definition, renders a form using [React-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form), formats the captured data into markdown via a custom [json2md](https://github.com/IonicaBizau/json2md) converter, and then posts the result to a Mattermost (and theoretically Slack, or any other compatible API) webhook.

### Running

`npm start` should be sufficient to run the application, but enironment variables need to be set for all functionality to work.

### Usage

This aim of this project is to handle a wide variety of forms while requiring no code be written. Therefore, all that is needed is a few environment variables to be set, and the react-scripts will build a working form.

```
REACT_APP_WEBHOOK_URL= target webhook for receiving formatted form data
REACT_APP_WEBHOOK_HOST= optional - used to determine the host to forward requests to. Can use the proxy react-script feature to send requests to avoid setting up CORS
REACT_APP_CHANNEL= mattermost_forms_channel
REACT_APP_USERNAME= mattermost_forms_bot
REACT_APP_SCHEMA= json schema defining form inputs. See docs for react-jsonschema-form for examples
REACT_APP_UI_SCHEMA= json-schema-forms ui definition - see details same as above
REACT_APP_MARKDOWN_MAPPING= array of json objects, that turns a form data key into a json2md markup node - see json2md docs for examples
```

These values can be set in a `.env` file. `REACT_APP_MARKDOWN_MAPPING` and `REACT_APP_SCHEMA` will be loaded from `config/md_mapping.json` and `/config/schema.json` respectively, if the variables are un-set

#### Markdown Mapping
Currently, only flat forms (for all datatypes) are supported. There are 4 forms of mapping
1. Key - key mapping
This allows any react-jsonschema-form formData attribute to be rendered as any supported json2md element, and formatted with a python like format string.

2. Table mapping
This allows for a number of form array inputs to be formatted in a table layout

3. Plain json2md

4. Plain markdown

The mapping is a JSON array, where each entry will be converted to Markdown in sequential order.
