<template>
  <div class="container mx-auto px-5 flex items-center flex-col flex-1">
    <div>
      <Breadcrumbs />
    </div>
    <div
      class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <VeeForm
        class="space-y-6"
        @submit="onSubmit"
        v-slot="{ meta = {}, errorMessage = '' }"
      >
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
              placeholder="Masukkan password"
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
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="remember" class="text-gray-500 dark:text-gray-300"
                >Ingat saya</label
              >
            </div>
          </div>
          <a
            href="#"
            class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Lupa password?</a
          >
        </div>
        <button
          type="submit"
          :disabled="!meta.valid"
          :class="[
            'w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center',
            !meta.valid
              ? 'bg-gray-500 dark:bg-gray-400'
              : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          ]"
        >
          Masuk
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Belum punya akun?
          <a
            href="#"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Daftar sekarang</a
          >
        </p>
      </VeeForm>
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
