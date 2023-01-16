<template>
  <div>
    <div>
      <h1>{{ $t('Setting') }}</h1>
      <hr>
      <v-select :items="this.$i18n.locales"
                v-model="data.lang"
                @change="loaditem"
                :label="$t('select language')"
                item-text="localname" item-value="code"
      ></v-select>
      <v-form @submit.prevent="save">

        <v-card color="basil">
          <v-card-title class="text-center justify-center py-6">

          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ $t(item) }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item     key="General"    >
              <v-card
                color="basil"
                flat
              >
                <v-card-text>
                  <v-text-field  :dir="$t('dir')" :label="$t('title')" v-model="data.title"></v-text-field>
                  <v-textarea  :dir="$t('dir')" :label="$t('keywords')"  v-model="data.keywords"></v-textarea>
                  <v-textarea :dir="$t('dir')"   :label="$t('description')"  v-model="data.description"></v-textarea>

                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item     key="ContactUs"    >
              <v-card
                color="basil"
                flat
              >
                <v-card-text>

                  <v-text-field dir="ltr" prepend-icon="mdi-phone"  :label="$t('phone')"  v-model="data.ContactUs.phone"></v-text-field>
                  <v-text-field dir="ltr" prepend-icon="mdi-cellphone" :label="$t('mobile')"   v-model="data.ContactUs.mobile"></v-text-field>
                  <v-text-field  :dir="$t('dir')"   prepend-icon="mdi-map-marker"   :label="$t('address')"  v-model="data.ContactUs.address"></v-text-field>
                  <v-text-field dir="ltr" prepend-icon= "mdi-message-text"  :label="$t('fax')"   v-model="data.ContactUs.fax"></v-text-field>
                  <v-text-field dir="ltr" prepend-icon="mdi-email"   :label="$t('email')"   v-model="data.ContactUs.email"></v-text-field>



                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item     key="SocailNetwork"    >
              <v-card
                color="basil"
                flat
              >
                <v-card-text>

                  <v-text-field  dir="ltr" prepend-icon="mdi-telegram"  label="telegram"  v-model="data.SocailNetwork['telegram']"></v-text-field>
                  <v-text-field dir="ltr" prepend-icon="mdi-facebook"  label="facebook"  v-model="data.SocailNetwork.facebook"></v-text-field>
                  <v-text-field dir="ltr" prepend-icon="mdi-twitter"  label="twitter"  v-model="data.SocailNetwork.twitter"></v-text-field>
                  <v-text-field dir="ltr" prepend-icon="mdi-instagram"  label="instagram"  v-model="data.SocailNetwork.instagram"></v-text-field>
                  <v-text-field dir="ltr" prepend-icon="mdi-whatsapp"  label="whatsapp"  v-model="data.SocailNetwork.whatsapp"></v-text-field>

                  <v-text-field dir="ltr" prepend-icon="mdi-google"  label="google"  v-model="data.SocailNetwork.google"></v-text-field>


                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item     key="Telegram"    >
              <v-card
                color="basil"
                flat
              >
                <v-card-text>

                  <v-text-field prepend-icon="mdi-telegram"  label="telegram"  v-model="data.chanaltelegram"></v-text-field>
                  <v-text-field prepend-icon="mdi-barcode"  label="api"  v-model="data.telegrapapi"></v-text-field>


                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <div class="pa-4">
            <v-btn type="submit">{{ $t('Save') }}</v-btn>

          </div>

        </v-card>
      </v-form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      data: {
        title:null,
        lang:this.$i18n.locale,

        keywords:null,
        description:null,
        telegrapapi:null,
        chanaltelegram:null,
        SocailNetwork:{},
        ContactUs: {},
      },
      tab:null,
      items: [
       'General','ContactUs', 'SocailNetwork', 'Telegram',
      ],
    }
  },

  methods:{
    save(){
      let that=this;
      this.$axios.put(this.$url+'v1/dashboard/setting/'+this.data.lang,this.data,
        {
       headers:{
         Authorization:localStorage.token
        }

      })
      .then(function (res){

      });

    },
    deleted(i){

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/setting/'+this.data.lang,
        {
          headers:{
            Authorization:localStorage.token
          }

        })
        .then(function (res){
            that.data=res.data.message;
        });

    }
  },
  mounted(){
    this.loaditem();
  }
}
</script>

<style>

</style>
