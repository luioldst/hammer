<template>
    <div style="padding-top: 50px;">
        <div class="heading">
            <img src="https://uploads-ssl.webflow.com/6172279814cf5440b9aec966/61af04bce7f1b7da9d7a5396_Thrivelab_Hello_b5qvbt_wrtcqb.svg">
            <h2 class="h2-md" style="margin-top: 10px;">
                NICE TO MEET YOU
            </h2>
            <h1 class="h1-intro h1-lg" style="max-width: 350px; line-height: 1.2; font-size: 25px;">
                Hi {{ $store.state.user.name }}!<br>
                Let's learn a little about you.
            </h1>
        </div>
    </div>
</template>