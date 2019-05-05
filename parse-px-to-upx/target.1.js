
<style lang="scss">
>uni-button {
    width: 64px;
    line-height: 28px;
    padding: 0;
    background: rgba(240, 240, 240, 0);
    border: 1px solid #9BA4BD;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #16325D;
    letter-spacing: 0;
    text-align: center;
    margin: 0 0 0 12px;

    &::after {
      display: none;
    }

    &.btn-reject {
      color: #F4A020;
      border-color: #F4A020;
    }

    &.btn-approve {
      color: #FF861D;
      border-color: #FF861D;
    }
  }
</style>
