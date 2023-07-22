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
                meta.dirty && (errorMessage || emailErrorMessage)
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500',
                emailErrorMessage ? 'border-red-500 focus:ring-red-500' : '',
              ]"
              placeholder="Masukkan email"
            />

            <span
              class="text-xs text-red-600"
              v-if="meta.dirty && (errorMessage || emailErrorMessage)"
            >
              {{
                emailErrorMessage
                  ? emailErrorMessage
                  : "* Wajib diisi (contoh: john.doe@gmail.com)"
              }}
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
        <div v-if="errorMessage" class="error-message">
          <span class="text-sm">Error - {{ errorMessage }} </span>
        </div>
        <button
          v-if="!isSubmitting"
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
        <div role="status" v-if="isSubmitting" class="flex justify-center">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
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

import { useUserOnBoardingStore } from "~/store/userOnBoarding";

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

    const emailErrorMessage = ref("");
    const errorMessage = ref("");
    const isSubmitting = ref(false);

    const router = useRouter();

    const onSubmit = async (values) => {
      try {
        errorMessage.value = "";
        isSubmitting.value = true;
        const formData = {
          fullName: values.fullName,
          email: values.email,
          whatsapp: values.whatsapp,
          password: values.password,
        };
        const response = await fetch("http://localhost:8080/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          const useUserOnBoardingStore = useUserOnBoardingStore();
          useUserOnBoardingStore.setJustRegistered(true);
          router.push("/check-email");
        } else {
          if (response.status === 400) {
            emailErrorMessage.value =
              "* Email telah didaftarkan. Mohon gunakan email berbeda.";
          } else {
            errorMessage.value = `${response.status}: ${data.message}`;
          }
        }
      } catch (error) {
        errorMessage.value = "An error occurred. Please try again.";
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      email,
      password,
      onSubmit,
      fullName,
      whatsapp,
      passwordConfirmation,
      isSubmitting,
      errorMessage,
      emailErrorMessage,
    };
  },
});
</script>
