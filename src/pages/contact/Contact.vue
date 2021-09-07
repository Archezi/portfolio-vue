<template>
  <div class="contact-form-container">
    <base-dialog
      title="Invalid Input!"
      v-if="invalidInput"
      @close="confirmError"
    >
      <template #default>
        <div class="dialog__msg">
          <p>Unfortunately, at least one input value is invalid.</p>
          <p>
            Please check all inputs and make sure you enter at least a few
            letters in each of the input.
          </p>
        </div>
      </template>
      <template #actions>
        <base-button mode="filled" @click="confirmError">Okay</base-button>
      </template>
    </base-dialog>
    <h2>Contact form</h2>
    <form class="contact-form" @submit.prevent="sendEmail">
      <label>Name</label>
      <input
        placeholder="Your name"
        v-model="name"
        type="text"
        name="user_name"
      />
      <label>Email</label>
      <input
        placeholder="Your email address"
        v-model.trim="email"
        type="email"
        name="user_email"
      />
      <label>Message</label>
      <textarea
        placeholder="Write your message to me"
        rows="10"
        v-model="message"
        name="message"
      ></textarea>
      <div class="submit-group">
        <p v-if="invalidInput">
          One or more input fields are invalid. Please check your provided data.
        </p>
        <button value="Send">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
  components: { BaseDialog },
  data() {
    return {
      allowSubmit: false,
      invalidInput: false,
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    sendEmail(e) {
      if (this.name === '' || this.email === '' || this.message === '') {
        this.invalidInput = true;
        return;
      }
      emailjs
        .sendForm(
          'service_1bc8413',
          'template_2crsdag',
          e.target,
          'user_SdOKvKR7YXBZr0ZG5GKxo'
        )

        .then(
          result => {
            console.log('SUCCESS!', result.status, result.text);
          },
          error => {
            console.log('FAILED...', error);
          }
        );
      this.name = '';
      this.email = '';
      this.message = '';
    },
    confirmError() {
      this.invalidInput = false;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.contact-form-container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: $background-main;
  padding: 20px;
  width: 50%;
  @include respond(phone) {
    width: 100%;
  }
}
h2 {
  text-align: left;
  padding: 2rem 0;
  font-size: $heading-primary;
  font-family: $font-secondary;
}
label {
  float: left;
  font-family: $font-primary;
  color: $color-primary-dark;
}
input::placeholder,
textarea::placeholder {
  color: $color-primary-light;
  font-family: $font-secondary;
  font-size: $text-primary;
}
input:focus-visible,
textarea:focus-visible {
  outline: 1px solid $color-secondary;
}
input[type='text'],
[type='email'],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid $background-skill;
  border-radius: 1px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  background-color: $background-skill;
  font-size: $text-primary;
  font-family: $font-secondary;
  color: $color-primary-light;
}

input[type='submit'] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-group {
  display: flex;
  padding: 0.5rem;
  p {
    color: red;
  }
}
.dialog__msg p {
  padding-top: 1rem;
  color: white;
}
button {
  width: 15rem;
  padding: 0.5rem;
  float: right;
  background-color: transparent;
  border: 1px solid $border-primary;
  font-family: $font-primary;
  font-size: $text-small;
  transition: all 0.3s ease-in-out;
  color: $color-primary-light;
  cursor: pointer;
}
button:hover {
  background-color: $color-secondary;
  width: 15rem;
}
</style>
