<template>
  <v-row justify="center" align="center">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-col>
      <v-card>
        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  counter
                  outlined
                  v-model="form.name"
                  type="text"
                  label="Nombre"
                  data-vv-scope="create_rol"
                  data-vv-name="nombre"
                  v-validate="'required|max:20'"
                  @input="form.name = $event.toUpperCase()"
                ></v-text-field>
                <FormError
                  :attribute_name="'create_rol.nombre'"
                  :errors_form="errors"
                ></FormError>
              </v-col>
              <v-col cols="12" md="12">
                <v-select
                  v-model="form.menus"
                  :items="menus"
                  chips
                  label="Seleccione uno o varios por favor"
                  multiple
                  outlined
                  :clearable="true"
                  :deletable-chips="true"
                  item-text="name"
                  item-value="id"
                  return-object
                  v-validate="'required'"
                  data-vv-scope="create_rol"
                  data-vv-name="menus"
                ></v-select>
                <FormError
                  :attribute_name="'create_rol.menus'"
                  :errors_form="errors"
                ></FormError>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="validar_formulario('create_rol')"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" md="12">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="calories"
        class="elevation-1"
        dark
        :footer-props="footer"
      >
        <template v-slot:top>
          <v-toolbar flat color="success">
            <v-toolbar-title>Roles</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-dialog
              v-model="dialog"
              color="primary"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-overlay :value="loading">
                  <v-progress-circular
                    indeterminate
                    size="64"
                  ></v-progress-circular>
                </v-overlay>
                <v-card-title>
                  <v-toolbar dark color="primary">
                    <v-btn icon @click="close">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn text @click="validar_formulario('create_menu_rol')"
                        >Guardar</v-btn
                      >
                    </v-toolbar-items>
                  </v-toolbar>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" class="text-center">
                        <h2 v-text="form.name"></h2>
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-select
                          v-model="form.menus_id"
                          :items="menus_rol"
                          chips
                          label="Seleccione uno o varios por favor"
                          multiple
                          outlined
                          :clearable="true"
                          :deletable-chips="true"
                          item-text="name"
                          item-value="id"
                          return-object
                          v-validate="'required'"
                          data-vv-scope="create_menu_rol"
                          data-vv-name="menus"
                        ></v-select>
                        <FormError
                          :attribute_name="'create_menu_rol.menus'"
                          :errors_form="errors"
                        ></FormError>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-card>
                          <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Menu</v-toolbar-title>
                          </v-toolbar>

                          <v-row>
                            <v-col cols="12" md="12" class="text-center">
                              <v-btn
                                class="ma-2"
                                fab
                                x-large
                                dark
                                color="error"
                                @click="destroy_menu_rol(delete_masivo)"
                              >
                                <v-icon v-text="'mdi-thumb-down'"></v-icon>
                              </v-btn>
                            </v-col>
                            <v-col cols="12" md="12">
                              <v-card-text>
                                <v-treeview
                                  :items="form.menus"
                                  selected-color="indigo"
                                  open-on-click
                                  selectable
                                  return-object
                                  selection-type="leaf"
                                  v-model="delete_masivo"
                                ></v-treeview>
                              </v-card-text>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            text
            icon
            color="green lighten-2"
            v-if="!item.deleted_at"
            @click="mapear(item)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            text
            icon
            :color="item.deleted_at ? 'blue lighten-2' : 'red lighten-2'"
            @click="destroy(item)"
          >
            <v-icon
              v-text="item.deleted_at ? 'mdi-thumb-up' : 'mdi-thumb-down'"
            ></v-icon>
          </v-btn>
        </template>
        <template v-slot:no-data>
          <br />
          <v-alert type="error">No hay información para mostrar.</v-alert>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import FormError from "../shared/FormError";

export default {
  name: "Rol",
  components: {
    FormError,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      search: "",
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "name",
        },
        { text: "Opciones", value: "actions", sortable: false },
      ],
      footer: {
        showFirstLastPage: true,
        firstIcon: "mdi-arrow-collapse-left",
        lastIcon: "mdi-arrow-collapse-right",
        prevIcon: "mdi-minus",
        nextIcon: "mdi-plus",
      },
      desserts: [],
      editedIndex: false,
      form: {
        id: 0,
        name: "",
        menus: [],
        menus_id: [],
      },
      delete_masivo: [],
      menus: [],
      menus_rol: [],
    };
  },
  computed: {
    formTitle() {
      return !this.editedIndex ? "Agregar rol" : "Administrar menu del rol";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.getMenu();
  },

  methods: {
    limpiar() {
      this.form.id = 0;
      this.form.name = null;
      this.form.menus = [];
      this.form.menus_id = [];
      this.editedIndex = false;
      this.delete_masivo = [];

      this.$validator.reset();
      this.$validator.reset();
    },

    initialize() {
      this.loading = true;

      this.$store.state.services.rolService
        .index()
        .then((r) => {
          if (r.response) {
            if (r.response.data.code === 423) {
              this.$toastr.error(r.response.data.error, "Mensaje");
            } else {
              for (let value of Object.values(r.response.data.error)) {
                this.$toastr.error(value, "Mensaje");
              }
            }
            this.loading = false;
            return;
          }
          console.log(r.data.data);
          this.desserts = r.data.data;
          this.close();
          this.loading = false;
        })
        .catch((r) => {
          this.loading = false;
        });
    },

    mapear(item) {
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.menus = item.rols_menus;

      this.getMenusRol(this.form.menus);

      this.editedIndex = true;
      this.dialog = true;
    },

    close() {
      this.limpiar();
      this.getMenu();
      this.dialog = false;
    },

    validar_formulario(scope) {
      this.$validator.validateAll(scope).then((result) => {
        if (result)
          this.editedIndex
            ? this.store_menu_rol(this.form)
            : this.store(this.form);
      });
    },

    destroy(data) {
      let title = !data.deleted_at ? "Desactivar" : "Activar";
      let type = !data.deleted_at ? "error" : "success";
      this.$swal({
        title: title,
        text: "¿Está seguro de realizar esta acción?",
        type: type,
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this.$store.state.services.rolService
            .destroy(data)
            .then((r) => {
              this.loading = false;

              if (r.response) {
                if (r.response.data.code === 404) {
                  this.$toastr.warning(r.response.data.error, "Advertencia");
                  return;
                } else if (r.response.data.code === 423) {
                  this.$toastr.warning(r.response.data.error, "Advertencia");
                  return;
                } else {
                  for (let value of Object.values(r.response.data)) {
                    this.$toastr.error(value, "Mensaje");
                  }
                }
                return;
              }

              this.$toastr.success(r.data, "Mensaje");
              this.initialize();
            })
            .catch((r) => {
              this.loading = false;
            });
        } else {
          this.close();
        }
      });
    },

    destroy_menu_rol(data) {
      let set = {};
      let title = "Desactivar";
      let type = "error";
      set.eliminar = data;

      this.$swal({
        title: title,
        text: "¿Está seguro de realizar esta acción?",
        type: type,
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this.$store.state.services.rolMenuService
            .eliminar_masivo(set)
            .then((r) => {
              this.loading = false;

              if (r.response) {
                if (r.response.data.code === 404) {
                  this.$toastr.warning(r.response.data.error, "Advertencia");
                  return;
                } else if (r.response.data.code === 423) {
                  this.$toastr.warning(r.response.data.error, "Advertencia");
                  return;
                } else {
                  for (let value of Object.values(r.response.data)) {
                    this.$toastr.error(value, "Mensaje");
                  }
                }
                return;
              }

              this.$toastr.success(r.data, "Mensaje");
              this.initialize();
            })
            .catch((r) => {
              this.loading = false;
            });
        } else {
          this.close();
        }
      });
    },

    store(data) {
      this.$swal({
        title: "Agregar",
        text: "¿Está seguro de realizar esta acción?",
        type: "success",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this.$store.state.services.rolService
            .store(data)
            .then((r) => {
              this.loading = false;

              if (r.response) {
                if (r.response.data.code === 404) {
                  this.$toastr.warning(r.response.data.error, "Advertencia");
                  return;
                } else if (r.response.data.code === 423) {
                  this.$toastr.warning(r.response.data.error, "Advertencia");
                  return;
                } else {
                  for (let value of Object.values(r.response.data)) {
                    this.$toastr.error(value, "Mensaje");
                  }
                }
                return;
              }

              this.$toastr.success(r.data, "Mensaje");
              this.initialize();
            })
            .catch((r) => {
              this.loading = false;
            });
        } else {
          this.close();
        }
      });
    },

    store_menu_rol(data) {
      this.$swal({
        title: "Agregar",
        text: "¿Está seguro de realizar esta acción?",
        type: "success",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this.$store.state.services.rolMenuService
            .store(data)
            .then((r) => {
              this.loading = false;

              if (r.response) {
                if (r.response.data.code === 404) {
                  this.$toastr.warning(r.response.data.error, "Advertencia");
                  return;
                } else if (r.response.data.code === 423) {
                  this.$toastr.warning(r.response.data.error, "Advertencia");
                  return;
                } else {
                  for (let value of Object.values(r.response.data)) {
                    this.$toastr.error(value, "Mensaje");
                  }
                }
                return;
              }

              this.$toastr.success(r.data, "Mensaje");
              this.initialize();
            })
            .catch((r) => {
              this.loading = false;
            });
        } else {
          this.close();
        }
      });
    },

    //necesarios
    getMenu() {
      this.loading = true;

      this.$store.state.services.menuService
        .index()
        .then((r) => {
          if (r.response) {
            if (r.response.data.code === 423) {
              this.$toastr.error(r.response.data.error, "Mensaje");
            } else {
              for (let value of Object.values(r.response.data.error)) {
                this.$toastr.error(value, "Mensaje");
              }
            }
            this.loading = false;
            return;
          }

          this.menus = r.data.data;
          this.loading = false;
        })
        .catch((r) => {
          this.loading = false;
        });
    },

    getMenusRol(items) {
      let temporal = [];
      this.loading = true;
      this.menus_rol = [];

      items.forEach((element_x) => {
        this.menus.forEach((element_y) => {
          element_x.menu_id == element_y.id
            ? this.menus.splice(this.menus.indexOf(element_y), 1)
            : null;
        });
      });

      items.forEach(function (item) {
        if (item.menu.father == 0 && !item.menu.hide) {
          var object = new Object();
          object.id = item.id;
          object.name = item.menu.name;
          object.children = [];
          items.forEach(function (child, i) {
            if (item.menu.id == child.menu.father && !child.menu.hide) {
              var object2 = new Object();
              object2.id = child.id;
              object2.name = child.menu.name;

              object.children.push(object2);
            }
          });
          
          object.children.length > 0 ? temporal.push(object) : null;
        }
      });

      this.menus_rol = this.menus;
      this.form.menus = temporal;
      this.loading = false;
    },
  },
};
</script>

