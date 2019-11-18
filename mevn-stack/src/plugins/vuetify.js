import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: colors.lightGreen
            }
        }
    }
}

export default new Vuetify(opts);
