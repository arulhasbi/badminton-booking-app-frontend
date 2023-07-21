<template>
  <div class="container mx-auto px-5 flex items-center flex-col flex-1">
    <div>
      <Breadcrumbs />
    </div>
    <div
      class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <VeeForm class="space-y-6" @submit="onSubmit" v-slot="{ meta = {} }">
        <h5 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">
          Daftar
        </h5>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm text-gray-900 dark:text-white"
            >Nama Lengkap</label
          >
          <Field
            id="full-name"
            name="full-name"
            rules="required"
            validateOnInput
            v-slot="{ field, errorMessage = '', meta = {} }"
          >
            <input
              type="text"
              :value="fullName"
              @input="
                fullName = $event.target.value;
                field.onChange($event);
              "
              @blur="field.onBlur"
              :class="[
                'bg-gray-50 text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white',
                meta.dirty && errorMessage
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500',
              ]"
              placeholder="Masukkan nama lengkap"
            />
            <span
              class="text-xs text-red-600"
              v-if="meta.dirty && errorMessage"
            >
              * Wajib diisi (contoh: Bunga Lestari)
            </span>
          </Field>
        </div>
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
            for="phoneNumber"
            class="block mb-2 text-sm text-gray-900 dark:text-white"
            >Nomor Whatsapp (Pastikan nomor sudah benar dan aktif)
          </label>
          <Field
            id="whatsapp"
            name="whatsapp"
            rules="required|numeric|digits_between:11,13"
            validateOnInput
            v-slot="{ field, errorMessage = '', meta = {} }"
          >
            <input
              type="text"
              :value="whatsapp"
              @input="
                whatsapp = $event.target.value;
                field.onChange($event);
              "
              @blur="field.onBlur"
              :class="[
                'bg-gray-50 text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white',
                meta.dirty && errorMessage
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500',
              ]"
              placeholder="Masukkan nomor whatsapp"
            />
            <span
              class="text-xs text-red-600"
              v-if="meta.dirty && errorMessage"
            >
              * Wajib diisi
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
        <div>
          <label
            for="password-confirmation"
            class="block mb-2 text-sm text-gray-900 dark:text-white"
            >Konfirmasi Password</label
          >
          <Field
            id="password-confirmation"
            name="password-confirmation"
            :rules="`required|same_as:${password}`"
            validateOnInput
            v-slot="{ field, errorMessage = '', meta = {} }"
          >
            <input
              type="password"
              :value="passwordConfirmation"
              @input="
                passwordConfirmation = $event.target.value;
                field.onChange($event);
              "
              @blur="field.onBlur"
              :class="[
                'bg-gray-50 text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white',
                meta.dirty && errorMessage
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500',
              ]"
              placeholder="Masukkan konfirmasi password"
            />
            <span
              class="text-xs text-red-600"
              v-if="meta.dirty && errorMessage"
            >
              * Wajib sama dengan password
            </span>
          </Field>
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
          Daftar
        </button>
      </VeeForm>
      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span
          class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"
          >atau</span
        >
      </div>
      <div>
        <button
          type="button"
          class="amazon-button-css px-5 py-2.5 text-sm w-full"
        >
          Daftar dengan
          <img
            class="w-4 h-4 ml-2"
            src="~/assets/icons/google-color-svgrepo-com.svg"
            alt="Google Sign In Logo"
          />
        </button>
      </div>
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
    const fullName = ref("");
    const email = ref("");
    const whatsapp = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");

    const onSubmit = (value) => {
      let loginData = value;
      loginData = JSON.stringify(loginData);
    };

    return {
      email,
      password,
      onSubmit,
      fullName,
      whatsapp,
      passwordConfirmation,
    };
  },
});
</script>
