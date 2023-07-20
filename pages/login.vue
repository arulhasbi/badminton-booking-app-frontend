<template>
  <div class="container mx-auto px-5 flex items-center flex-col flex-1">
    <div
      class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <VeeForm class="space-y-6" @submit="onSubmit" v-slot="{ errors }">
        <h5 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">
          Masuk
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm text-gray-900 dark:text-white"
            >Email</label
          >
          <Field
            id="email"
            name="email"
            rules="required|email"
            validateOnInput
            v-slot="{ field, errorMessage = '', meta = {} }"
          >
            <input
              type="text"
              :value="email"
              @input="
                email = $event.target.value;
                field.onChange($event);
              "
              @blur="field.onBlur"
              :class="[
                'bg-gray-50 text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white',
                meta.dirty && errorMessage
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500',
              ]"
              placeholder="Masukkan email"
            />
            <span
              class="text-xs text-red-600"
              v-if="meta.dirty && errorMessage"
            >
              * Wajib diisi (contoh: john.doe@gmail.com)
            </span>
          </Field>
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm text-gray-900 dark:text-white"
            >Password</label
          >
          <Field
            id="password"
            name="password"
            rules="required|strong_password"
            validateOnInput
            v-slot="{ field, errorMessage = '', meta = {} }"
          >
            <input
              type="password"
              :value="password"
              @input="
                password = $event.target.value;
                field.onChange($event);
              "
              @blur="field.onBlur"
              :class="[
                'bg-gray-50 text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white',
                meta.dirty && errorMessage
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500',
              ]"
              placeholder="Enter password"
            />
            <span
              class="text-xs text-red-600"
              v-if="meta.dirty && errorMessage"
            >
              <ul class="mt-1.5">
                <li>* Lebih dari 7 huruf.</li>
                <li>* 1 atau lebih huruf kapital.</li>
                <li>* 1 atau lebih huruf kecil.</li>
                <li>* 1 atau lebih angka.</li>
                <li>* 1 atau lebih karakter spesial (!,@,#, dll.)</li>
              </ul>
            </span>
          </Field>
        </div></VeeForm
      >
    </div>
  </div>
</template>

<script>
import { defineCustomRules } from "~/utils/form_rules.js";
import { Form as VeeForm, Field } from "vee-validate";
import { required, email, numeric } from "@vee-validate/rules";
import { defineRule } from "vee-validate";

defineRule("required", required);
defineRule("email", email);
defineRule("numeric", numeric);

export default defineComponent({
  components: {
    VeeForm,
    Field,
  },
  created() {
    defineCustomRules();
  },
  setup() {
    const email = ref("");
    const password = ref("");

    const isFormValid = computed(() => {
      return email.value && password.value;
    });

    const onSubmit = (value) => {
      let loginData = value;
      logoutData = JSON.stringify(loginData);
    };

    return {
      email,
      password,
      isFormValid,
      onSubmit,
    };
  },
});
</script>
