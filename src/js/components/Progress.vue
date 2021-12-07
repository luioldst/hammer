<template>
    <div class="custom-progress">
        <div class="progress-percent" :style=" { width: `${progress}%` }"></div>
    </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Number,
            default: 10
        }
    }
}
</script>