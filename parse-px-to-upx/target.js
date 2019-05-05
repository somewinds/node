
<style lang="scss">
>uni-button {
    width: 128upx;
    line-height: 56upx;
    padding: 0;
    background: rgba(240, 240, 240, 0);
    border: 2upx solid #9BA4BD;
    border-radius: 4upx;
    font-family: PingFangSC-Regular;
    font-size: 24upx;
    color: #16325D;
    letter-spacing: 0;
    text-align: center;
    margin: 0 0 0 24upx;

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
