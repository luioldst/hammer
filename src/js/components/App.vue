<template>
    <div>
        <introduction v-if="$store.state.screen == 'introduction'"></introduction>
        <thyroid-imbalance v-if="$store.state.screen == 'thyroid-imbalance'"></thyroid-imbalance>
        <thyroid-imbalance-rating v-if="$store.state.screen == 'thyroid-imbalance-rating'"></thyroid-imbalance-rating>
        <testosterone-imbalance v-if="$store.state.screen == 'testosterone-imbalance'"></testosterone-imbalance>
        <testosterone-imbalance-rating v-if="$store.state.screen == 'testosterone-imbalance-rating'"></testosterone-imbalance-rating>
        <goals v-if="$store.state.screen == 'goals'"></goals>
        <cancer v-if="$store.state.screen == 'cancer'"></cancer>
        <birthday-male v-if="$store.state.screen == 'birthday-male'"></birthday-male>
        <contact-number-male v-if="$store.state.screen == 'contact-number-male'"></contact-number-male>
        <result v-if="$store.state.screen == 'result'"></result>

        <birthday-female v-if="$store.state.screen == 'birthday-female'"></birthday-female>

        {{ $store.state.screen }}
    </div>
</template>

<script>
export default {

    
}
</script>
