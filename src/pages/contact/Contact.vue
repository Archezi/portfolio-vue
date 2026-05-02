<template>
  <div class="contact-form-container">
    <base-dialog
      title="Invalid Input!"
      :open="invalidInput"
      @close="confirmError"
    >
      <template #default>
        <div class="dialog__msg">
          <p>Unfortunately, at least one input value is invalid.</p>
          <p>
            Would you mind checking all inputs and making sure you enter at
            least a few letters in each input?
          </p>
        </div>
      </template>
      <template #actions>
        <base-button mode="filled" @click="confirmError">Okay</base-button>
      </template>
    </base-dialog>
    <base-dialog
      title="Invalid Input!"
      :open="invalidInput"
      @close="confirmError"
    >
      <template #default>
        <div class="dialog__msg">
          <p>Please fill in all fields before submitting.</p>
        </div>
      </template>
      <template #actions>
        <base-button mode="filled" @click="confirmError">Okay</base-button>
      </template>
    </base-dialog>

    <transition name="fade" mode="out-in">

      <div v-if="sendConfirmation" class="success-state">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2>message sent <span class="blink">_</span></h2>
        <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
        <button class="reset-btn" @click="confirmSendConfirmationModal">Send another ></button>
      </div>

      <div v-else>
        <h2>Contact form</h2>
        <form class="contact-form" @submit.prevent="sendEmail">
          <label>Name</label>
          <input placeholder="Your name" v-model="name" type="text" name="user_name" />
          <label>Email</label>
          <input placeholder="Your email address" v-model.trim="email" type="email" name="user_email" />
          <label>Message</label>
          <textarea placeholder="Write your message to me" rows="10" v-model="message" name="message"></textarea>
          <div class="submit-group">
            <button type="submit" :disabled="sending">{{ sending ? 'Sending...' : 'Submit' }}</button>
          </div>
        </form>
      </div>

    </transition>
  </div>
</template>

<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
  components: { BaseDialog },
  data() {
    return {
      invalidInput: false,
      sendConfirmation: false,
      sending: false,
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    async sendEmail() {
      if (this.name === '' || this.email === '' || this.message === '') {
        this.invalidInput = true;
        return;
      }

      this.sending = true;

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: '29a20d43-bbdf-4e81-b51b-0e558650f264',
            name: this.name,
            email: this.email,
            message: this.message
          })
        });

        const result = await response.json();

        if (result.success) {
          this.name = '';
          this.email = '';
          this.message = '';
          this.sendConfirmation = true;
        } else {
          this.invalidInput = true;
        }
      } catch {
        this.invalidInput = true;
      } finally {
        this.sending = false;
      }
    },
    confirmError() {
      this.invalidInput = false;
    },
    confirmSendConfirmationModal() {
      this.sendConfirmation = false;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
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
  font-weight: 300;
}

.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;

  h2 {
    font-size: $heading-primary;
    font-family: $font-primary;
    color: $color-primary-light;
    font-weight: 600;
    margin-bottom: 1.6rem;
  }

  p {
    font-family: $font-secondary;
    font-size: $text-primary;
    color: $color-primary-dark;
    line-height: 1.8;
    margin-bottom: 3rem;
    max-width: 36rem;
  }
}

.success-icon {
  width: 6rem;
  height: 6rem;
  border: 1px solid #7c4ff5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.4rem;
  color: #7c4ff5;

  svg {
    width: 2.8rem;
    height: 2.8rem;
  }
}

.reset-btn {
  background: transparent;
  border: 1px solid $border-primary;
  color: $color-primary-dark;
  font-family: $font-secondary;
  font-size: $text-small;
  padding: 0.8rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: auto;
  float: none;

  &:hover {
    border-color: #7c4ff5;
    color: #7c4ff5;
    background: transparent;
    width: auto;
  }
}

.blink {
  animation: blink 1s step-end infinite;
  color: #7c4ff5;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
