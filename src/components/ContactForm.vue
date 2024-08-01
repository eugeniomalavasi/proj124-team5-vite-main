<script>
import axios from "axios";

export default {
    name: "ContactComponent",
    props: {
        apartment_id: Number
    },
    data() {
        return {
            form: {
                name: "",
                mail: "",
                message: "",
                apartment_id: this.apartment_id
            },
            contactSend: false,
            isLoading: false,
            errors: {},
        };
    },

    methods: {
        deleteAlert() {
                setTimeout(() => {
                this.contactSend = false;
            }, 5000); 
        },
        validateForm() {
            this.errors = {};
            if (!this.form.name) {
                this.errors.name = ["Il nome è obbligatorio."];
            }
            if (!this.form.mail) {
                this.errors.mail = ["La mail è obbligatoria."];
            } else if (!this.validEmail(this.form.mail)) {
                this.errors.mail = ["Inserisci una mail valida."];
            }
            if (!this.form.message) {
                this.errors.message = ["Il messaggio è obbligatorio."];
            } else if (this.form.message.length > 500) {
                this.errors.message = ["Il messaggio non può superare i 500 caratteri."];
            }
            return Object.keys(this.errors).length === 0;
        },
        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
            return re.test(email);
        },
        sendForm() {
            if (this.validateForm()) {
                this.isLoading = true;
                axios
                    .post("http://127.0.0.1:8000/api/leads", this.form)
                    .then((resp) => {
                        console.log(resp);
                        if (resp.data.success) {
                            this.contactSend = true;
                            this.clearFields();
                        }
                    })
                    .catch((err) => {
                        console.log('There was an error sending the message:', err);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },
        clearFields() {
            this.form.name = "";
            this.form.mail = "";
            this.form.message = "";
        },
    },
};
</script>


<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-10 col-lg-8">
                <h1>Contattaci!</h1>
                <div id="success" class="alert alert-success" v-if="contactSend">
                    Il tuo messaggio è stato inviato con successo
                </div>
                <form>
                    <input type="hidden" :value="apartment_id" name="apartment_id" />
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="name" class="form-label">Nome <span class="text-danger">*</span></label>
                                <input type="text" autocomplete="off" class="form-control" :class="{ 'is-invalid': errors.name }" id="name" v-model="form.name" placeholder="Inserisci il tuo nome" />
                                <div class="invalid-feedback" v-if="errors.name">
                                    {{ errors.name[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="mail" class="form-label">Mail <span class="text-danger">*</span></label>
                                <input type="email" autocomplete="off" class="form-control" :class="{ 'is-invalid': errors.mail }" id="mail" v-model="form.mail" placeholder="Inserisci la tua mail" />
                                <div class="invalid-feedback" v-if="errors.mail">
                                    {{ errors.mail[0] }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Messaggio <span class="text-danger">*</span></label>
                        <textarea class="form-control" autocomplete="off" :class="{ 'is-invalid': errors.message }" id="message" v-model="form.message" placeholder="Ciao, mi interessa il tuo appartamento.." maxlength="500"></textarea>
                        <div class="invalid-feedback" v-if="errors.message">
                            {{ errors.message[0] }}
                        </div>
                        <div class="text-end">
                            <small>{{ form.message.length }}/500</small>
                        </div>
                    </div>

                    <button @click.prevent="sendForm(), deleteAlert()" type="submit" class="btn ms_btn" :disabled="isLoading">
                        <span class="text-white" v-if="!isLoading"> Invia </span>
                        <div v-else class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </form>
                <p class="mt-3"><small>Compila i campi contrassegnati con <span class="text-danger">*</span>.</small></p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .btn.ms_btn {
        background-color: #FE5D26;
        border: none;
    }

    .btn.ms_btn:hover {
        background-color: #fc9775;
    }

</style>