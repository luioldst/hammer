<template>
<div>
    <div>
        <label>First Name</label>
        <input type="text" v-model="name">
    </div>
    <div>
        <label>Email</label>
        <input type="email" v-model="email">
    </div>
    <div>
        <label>Closest Metro</label>
        <select v-model="MPA">
            <option v-for="mpa in MPA_selection"  :key="`MPA-${mpa.id}`" :value="mpa.id">{{ mpa.city_name }}</option>
        </select>
    </div>
    <div>
        <label>Gender</label>
        <select v-model="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    </div>

    <button @click="createProfile">Submit</button>
    

    {{ this.$store.state.gender }}

    

</div>
</template>

<script>
import $http from './../api.service';
export default {
    data () {
        return {
            name: '',
            gender: 'male',
            MPA: '',
            email: '',
            MPA_selection: []
        }
    },

    created () {
        this.getCMSData();
        
    },  

    methods: {
        getCMSData () {
            $http.instance.get('/v1/router/mpa/').then (response => {
                this.MPA_selection = response.data;
                this.populateLocally();
            });

            if (this.$store.state.username) {
                $http.instance.get(`/v1/fake-profile/${this.$store.state.username}/`).then (response => {
                    this.$store.commit('SET_LOCAL_DATA', {
                        key: 'user',
                        data: response.data.user_data
                    });
                    this.populateLocally();
                });

                
            }   
        },

        populateLocally () {
            if (this.$store.state.user) {
                this.name = this.$store.state.user['name'] || '';
                this.MPA = this.$store.state.user['MPA'] || '';
                this.gender = this.$store.state.user['gender'] || '';
                this.email = this.$store.state.user['user_fake_profile'] || '';
            }
            
        },

        createProfile () {
            $http.instance.post('/v1/fake-profile-create/', {
                Cache_id: '',
                MPA: this.MPA,
                Traffic_Source: '',
                gender: this.gender,
                name: this.name,
                user_fake_profile: this.email
            }).then ( response => {
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'screen',
                    data: this.gender == 'male' ? 'thyroid-imbalance' : 'birthday-female'
                });

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'username',
                    data: response.data.user_data.slug
                });

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'user',
                    data: response.data.user_data
                })
            })
        }
    }
    
}
</script>
