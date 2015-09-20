Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

new Vue({

  el: '#guestbook',

  data: {

    newMessage: {
      name: '',
      message: '',
    },

    submitted: false
  },

  computed: {
    errors: function() {
      for (var key in this.newMessage) {
        if (! this.newMessage[key]) {
          return true;
        }
        return false;
      }
    }
  },

  ready: function() {
    this.fetchMessages();
  },

  methods: {

    fetchMessages: function() {
      this.$http.get('/api/messages', function(messages) {
        this.$set('messages', messages);
      });
    },

    onSubmitForm: function(e) {
      //prevent the default action
      e.preventDefault();

      var message = this.newMessage;

      //add new message to messages array
      this.messages.push(message);
      //reset input values
      this.newMessage = {name: '', message: ''};
      //show thanks message
      //hide submit button
      this.submitted = true;
      //POST ajax Request
      this.$http.post('api/messages', message);
    }

  }
});
