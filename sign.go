package main

import (
	"encoding/hex"
	"fmt"

	"github.com/ElrondNetwork/elrond-go/crypto/signing"
	"github.com/ElrondNetwork/elrond-go/crypto/signing/mcl"
	"github.com/ElrondNetwork/elrond-go/crypto/signing/mcl/singlesig"
	"github.com/ElrondNetwork/elrond-sdk/erdgo"
)

func main() {
	validatorPk, _ := erdgo.LoadPrivateKeyFromPemFile("pv2.pem")

	address := "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqz8llllsh6u4jp"
	sig, _ := getStakeSig(address, "pv2.pem")
	publicKey, _ := getValidatorKeyFromPrivateKey(validatorPk)

	fmt.Println(address)
	fmt.Println(hex.EncodeToString(publicKey))
	fmt.Println(hex.EncodeToString(sig))
}

func getValidatorKeyFromPrivateKey(skBytes []byte) ([]byte, error) {
	gen := signing.NewKeyGenerator(mcl.NewSuiteBLS12())

	sk, err := gen.PrivateKeyFromByteArray(skBytes)
	if err != nil {
		return nil, err
	}

	return sk.GeneratePublic().ToByteArray()
}

func getStakeSig(address string, validatorKeyFilename string) ([]byte, error) {
	gen := signing.NewKeyGenerator(mcl.NewSuiteBLS12())
	signer := singlesig.NewBlsSigner()

	skBytes, err := erdgo.LoadPrivateKeyFromPemFile(validatorKeyFilename)
	if err != nil {
		return nil, err
	}

	sk, err := gen.PrivateKeyFromByteArray(skBytes)
	if err != nil {
		return nil, err
	}

	addrBytes, err := erdgo.Bech32ToPubkey(address)
	if err != nil {
		return nil, err
	}

	return signer.Sign(sk, addrBytes)
}
