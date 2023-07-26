<template>
  <div class="container mx-auto px-5 flex items-center flex-col flex-1">
    <div class="relative w-full max-w-2xl max-h-full">
      <Breadcrumbs />
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <h3 class="mb-7 text-xl font-semibold text-gray-900 dark:text-white">
          Verifikasi Email
        </h3>
        <VeeForm class="space-y-6" @submit="onSubmit" v-slot="{ meta = {} }">
          <div class="-mb-2">
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
          <button
            v-if="!isSubmitting && !linkSent"
            type="submit"
            :disabled="!meta.valid"
            :class="[
              'w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center',
              !meta.valid
                ? 'bg-gray-500 dark:bg-gray-400'
                : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
            ]"
          >
            Verifikasi
          </button>
          <LoadingSpinner v-if="isSubmitting" />
        </VeeForm>
        <div class="email-verification-info mt-6">
          <p v-if="linkSent" class="flex items-center gap-1.5">
            <img
              class="w-4 h-4"
              src="~/assets/icons/information.svg"
              alt="Price Tag"
            />
            <span class="text-sm text-teal-600">
              {{ successMessage }}
            </span>
          </p>
          <p v-if="errorMessage" class="flex items-center gap-1.5">
            <img
              class="w-4 h-4"
              src="~/assets/icons/information-red.svg"
              alt="Price Tag"
            />
            <span class="text-sm text-red-600"> {{ errorMessage }} </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form as VeeForm, Field, defineRule } from "vee-validate";
import { required, email } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);

export default defineComponent({
  components: {
    VeeForm,
    Field,
  },
  setup() {
    const email = ref("");
    const errorMessage = ref("");
    const isSubmitting = ref(false);
    const successMessage = ref("");
    const linkSent = ref(false);
    const onSubmit = async (values) => {
      try {
        successMessage.value = "";
        errorMessage.value = "";
        isSubmitting.value = true;
        const formData = {
          email: values.email,
        };
        const response = await fetch(
          "http://localhost:8080/users/resend-verification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          linkSent.value = true;
          successMessage.value = data.message;
        } else {
          errorMessage.value = data.message;
        }
      } catch (error) {
        errorMessage.value = "An error occurred. Please try again.";
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      email,
      onSubmit,
      isSubmitting,
      linkSent,
      errorMessage,
      successMessage,
    };
  },
});
</script>
