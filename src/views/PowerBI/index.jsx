import React, { Component } from 'react'
import PowerbiEmbedded from 'react-powerbi'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <PowerbiEmbedded
          id={`f6bfd646-b718-44dc-a378-b73e6b528204`}
          embedUrl={`https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19`}
          accessToken={`H4sIAAAAAAAEACWWtc7GDHaE7-VvHclMkbYwM71md2Zm9ir3nm-T_hRzRjN65t__2Ok7zGnxz3__Y45UkhcAaZVnPSCekEIw8qlLmgqvK6esplW9VNAWFjTpbSayAuvGDPP6NPqgNR1HuNA8i7DOeuxOZe7UVIchSr1zttldUrxkqwULvR0068wqqPHI5KG_E7u1-eCbHbjkHzlZ74tQMaqudWvs969QW3ikCAErr9YNnXXY1Jj0sNYZ5rbWrTv76jaiWIEQmcUMwi_C00-xekXCYDNMVeY2eKOntJEyC40capvyNtx7-JjORxX6YUqAxBjQRMECPbbta0j3OVR2SOx2q203IwhGGgLJo3gp5ocLYLg3iqfiu4D9mIhUD0F02m3TNmUImIIA1MwX68JGTUlWMb_cpBVSJTtAeOW2xife2KhzqHXCGUH8NrbQ5AmnO3I64S7g48lKYgCPbyMQBupPKkKx4ltYgCrWEB4qn2RV3Vcxa5VGWmijo7QgH9PSim55NcmGdvsIo_e4n0R0bEE_pzcLH2diAQEKejCoUZnEhjnTm-N4qkplxi0FpKXmJwVSqmdizLX2PRfCGDtQ0GIclGCWmVssRHVqiprJ1eYpvaAPpZrn_Oq675j1JsY6eH-MkG1-0NUaPGOpsa2XMXAMlcDN4YNqD0h-4k63aHxg7B-5NyDf16r6BZEgsy13GHTfMf3sGl8iiw-q3YyKU-QAd6HW4eJ6O2LScludFvKVAymRAQfYxWnpbKixSb7OIKcHXqTEazt6oTE3aEKgWvqxp0QhfaHGqNK1uyLFQKtJwri4efNYJbzhWSOA9hYVLl4F85mzsJrbYgK898p8UiUnrj1n1xAlTOigOY-cLj4qrLnVNzOKPxe7sXDkwylx6RwBGGKQAihIuU4dvqYcl_489WpGUyXxjBls_PTUACW003gVLqQdtLuxJmReRgy3M3MbNb6Sc3Xcn0I2AvRXY54efQrhP3DK9wYwpA9-x8YM-PgrCJbbXwTDGh85aiU2dNLwDbZyNQkrd1O4BVlm1xSBfx2XzSxKegZaZpV_lK9dPrVrsHUrwVmrOdZa3qL_zaSEbbmR9xdlopl3R4jk5ybCXnx6sHWKgtwytR6kMkaVdiuv7H0ylhTw4atb8dbR2U0QL2mfa8cOH_Wf4JdNVcrK7s10v7BgdbQV8fQXe4KOeiR4shwSxzb7ewzh6j6YkteBtvtvSGqr43ZQCrAf8px1JWDaIUz3Y8cOUOOCVaYwpWPLcKVUo5ZVqnclRso3-pjoWh2tpvupuF3mzI4xIj9zXpS5fAV7dxNR660xvDpvhnsG_ZidfXykmIJk08otCscZ2K5PUWi00TJQBajnT41MtDI2k08ai8bJgsB_sQVuOjLlZ9NDbvxK1mMNynbnPlF2XQyW7YToOhuTk_2i8pTPouFiqWCYA0TBVSsQ_Q6EZz1vYqByp4O4bfdKsW5R7D4-ivuA7rtA7cLEqz_w5q5HSRM738hUPFfH07bMXBPgfez8GoLGCLggr4-Xq360_KkAraujGl-G4V24n3CM2mlf8b3W4xXZdxo-QUg_-nLhAq7nNlEJmjY1WNPWOPo37oKSSQgwcARIklHkcQIr-23n1SMvfH_VIe3nZfSpXyPX5lMarOjKCS1L2jY2IDo0H81vehL46Z6TgTQq_HocWPybwMN2yHLmMEYZj-U6JXdez7XeBR40Wv_s9EB0SVvNeBB44VdOMp4mwLg8axZ28dHXGd8qqiLuSTVFrxN_U6v89ELLDi1UpDhZjVd8KykmoeBealLvcocSr3Z5Lucwu-q2OorYzNQska3r03Hy00rfcDX8XJdFi7nvPO6GyznjGIGa90tNIhKGHrjyPJ6vkRzBWsiqlov53iQyLbhfxZyh8hG9s2By6s4Ien1v8l093II1HStaW_Hh8rvWGOedM7FLx4r1c84Y0k5h0I6s1SMuQDRFxEWxDjdvlMUv6awdeUQEMAC7lRQkrnMeDidgK3dFnE4oPjVzTJWs0gXwCxTrkaG21Sxpbzlp682iZgaQO-9hNB_uq84_fKZUWUPj0A-te6pNYLoxChIkvuKHP_UxskkQ3edvlvGrT--Zg8_9OiNQj4OiGFIN1V_AkSoVapAlCXcgb9MhsdYFqd7BZ3_O15_YqX1XmJce_HbShmwlm4fJa2wp--J_AQLnWPkZxZZeDDyjBzOdoWnrf3REZ6gymUhQYUOFrS15N8gRY6msAlRWIHCaXa7usvWu5dqeFth7yxQJHXLl8EPXWuZf__rnv_7htnc5Zq18_2ZK__vDzWUISphwvAEZ8rnz0I4rI0A5kDQSPO29x7AQKb842jm7WNF9GWkslN-6l1jwbGUXrMwgnxO4MBzRMxhD7zPKOmMIs5CiQJ9sNhA4mTzJmysOwd8Q0thP0LRTRXP791SYFXxGUrAW4auuaqjta83aqyp_hDeIJATkS4VUN2bFNG66Dq3BQWZU-BMQyuUCC0IVxdrI4EmjoT-cBi9o7ThjW9_wKS_hMk8Z1UGm1p4gIl9qchBX7eXoOVgbgFd6vjoL79YKXSQPxxqYvNTp-dSberKhsbfUQIYFIJFxQpj1WCIFJHGLOG72TgBSy_IFe4cUx5JrhT1jwluUT15nJrr_3-Z3acpNCf5cTpwyMfNxgmX9yAl3D-mdyer_u3LbekqPcyv_zmZezWElHZ-MarW1jDjk5VF2NpkraxHtQT_KeLlqQ_Spxa9y4kIH3A7fYSb2DwoQvvcEscVMzFHbm--CaxHTaa-RuklSuROMI_Vya6dALVYqN44jCG2dLBpQDWDCEKj8f14qS3-Rci29fvgeG3-t3ckw3X1eqwHrJFQjqlVZ_P2FuMnoBptBIwLbhSL5PeJKLKiIutMq00kNG5eHeZQmNWYUtYqsKzGZx3U677laNf6JDZMVLJJu2ElpZKKz4OQiY5_4KAdo01aA7FTgn-2gnvW3zWyEoj3Ki2WjTguGAOqu4bJvAEOJv87fX71IfUZmF0wf2L-IKKF-kwBnrAxtbr8h_7H5f_4XkONbbJoLAAA=`}
          filterPaneEnabled={true}
          navContentPaneEnabled={true}
          embedType={`report`}
          width='1040px'
          height='600px'
        />
      </div>
    )
  }
}

export default App