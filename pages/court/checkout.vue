<template>
  <div class="container mx-auto px-5 flex items-center flex-col flex-1">
    <div>
      <Breadcrumbs />
    </div>
    <div
      class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <VeeForm class="space-y-6" @submit="onSubmit" v-slot="{ errors }">
        <div class="-mb-1.5">
          <h5
            class="text-lg font-medium text-gray-900 dark:text-white text-decoration underline"
          >
            Checkout
          </h5>
          <span class="text-sm"
            >Pastikan kembali informasi lapangan yang akan dibooking sebelum
            melakukan pembayaran.</span
          >
        </div>
        <div>
          <div class="-mb-1.5">
            <p class="text-base font-medium mb-1">
              {{ courtInfo.name }}
            </p>
            <div class="flex flex-row gap-1 mb-4 items-center">
              <span
                class="bg-pink-100 text-gray-800 text-xs inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
              >
                <img
                  class="w-3 h-3 mr-1"
                  src="~/assets/icons/phone-rounded-svgrepo-com.svg"
                  alt="Phone Number"
                />
                {{ courtInfo.phoneNumber }}
              </span>
              <a
                href="#"
                class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Lihat lokasi di google map</a
              >
            </div>
          </div>
          <div class="mb-2.5">
            <p class="text-base mb-0.5">Harga</p>
            <span
              class="bg-green-300 text-gray-800 text-xs inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
            >
              <img
                class="w-3 h-3 mr-1"
                src="~/assets/icons/price-tag-svgrepo-com.svg"
                alt="Price Tag"
              />
              {{ formatCurrency(courtInfo.rate) }} / Jam
            </span>
          </div>
          <div class="mb-3">
            <p class="text-base mb-1">Waktu</p>
            <div class="flex flex-wrap gap-2">
              <span
                class="border border-gray-500 bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                v-for="slot in bookingData.time_slots"
                :key="slot._id"
                >{{ slot.hourRange }}</span
              >
            </div>
          </div>
          <div class="mb-2">
            <p class="text-base mb-0.5 font-bold">Total Bayar</p>
            <p class="text-sm">
              {{ formatCurrency(courtInfo.rate) }} X
              {{ bookingData.time_slots.length }} Jam =
              <b class="text-decoration underline"
                >{{
                  formatCurrency(
                    courtInfo.rate * bookingData.time_slots.length
                  )
                }},-</b
              >
            </p>
          </div>
        </div>
        <hr
          class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"
        />
        <h5
          class="mb-2 text-lg font-medium text-gray-900 dark:text-white text-decoration underline"
        >
          Konfirmasi Pemesanan
        </h5>
        <span class="text-sm"
          >Silahkan isi informasi pengguna terlebih dahulu sebelum melakukan
          pembayaran.</span
        >
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
              placeholder="Masukkan nama"
            />
            <span
              class="text-xs text-red-600"
              v-if="meta.dirty && errorMessage"
            >
              Wajib diisi
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
              type="email"
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
              Wajib diisi
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
              Wajib diisi
            </span>
          </Field>
        </div>

        <div class="flex items-center">
          <input
            v-model="termsAccepted"
            id="link-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="link-checkbox"
            class="ml-2 text-sm text-gray-900 dark:text-gray-300"
            >Menyetujui
            <a class="text-blue-600 dark:text-blue-500 hover:underline"
              >aturan</a
            >
            yang dibuat oleh IndeptHustle.
          </label>
        </div>

        <button
          type="submit"
          :disabled="!isFormValid"
          :class="[
            'w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center',
            !isFormValid
              ? 'bg-gray-500 dark:bg-gray-400'
              : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          ]"
        >
          Konfirmasi & Bayar
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script>
import { defineCustomRules } from "~/utils/form_rules.js";
import { Form as VeeForm, Field } from "vee-validate";
import { required, email, numeric } from "@vee-validate/rules";
import { defineRule } from "vee-validate";
import { useBookingStore } from "~/store/booking";

defineRule("required", required);
defineRule("email", email);
defineRule("numeric", numeric);

export default {
  components: {
    VeeForm,
    Field,
  },
  created() {
    defineCustomRules();
  },
  setup() {
    const bookingStore = useBookingStore();

    const fullName = ref("");
    const email = ref("");
    const whatsapp = ref("");
    const termsAccepted = ref(false);

    const isFormValid = computed(() => {
      return (
        fullName.value && email.value && whatsapp.value && termsAccepted.value
      );
    });

    // Access the data
    const bookingData = bookingStore.bookingData;
    const courtId = bookingStore.courtId;
    const courtInfo = bookingStore.courtInfo;

    // Submit checkout data
    const onSubmit = (value) => {
      let checkoutData = value;
      checkoutData.termsAccepted = termsAccepted.value;
      checkoutData = JSON.stringify(checkoutData, null, 2);
      console.log(checkoutData);
    };

    return {
      bookingData,
      courtId,
      courtInfo,
      fullName,
      email,
      whatsapp,
      termsAccepted,
      isFormValid,
      termsAccepted,
      onSubmit,
    };
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
};
</script>
