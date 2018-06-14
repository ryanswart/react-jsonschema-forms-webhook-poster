export default {
  webhookURL: "/hooks/zn3hj3bq5b897pse6bqopmoaqy",
  markdownMapping: [
    { key: 'user', el: 'h2', format: 'Status update for {0}'},
    { table: {
      headers: [ 'DOING', 'DONE', 'BLOCKING'],
      rows: ['doing', 'done', 'blocking']
    }
    }
  ],
  schema: {
    "title": "Standup Tracking Form",
    "type": "object",
    "required": [
      "user"
    ],
    "properties": {
      "user": {
        "type": "string",
        "title": "Name"
      },
      "done": {
        "type": "array",
        "title": "Done",
        default: [],
        "items": {
          "type": "string"
        }
      },
      "doing": {
        "type": "array",
        "title": "Doing",
        default: [],
        "items": {
          "type": "string"
        }
      },
      "blockers": {
        "type": "array",
        "title": "Blockers",
        default: [],
        "items": {
          "type": "string"
        }
      }
    }
  }
};
