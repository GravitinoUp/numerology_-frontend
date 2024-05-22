import { LocalizationInterface } from '.'

export interface ResultInterface {
    result_uuid: string
    result_keys: string[]
    result_name: LocalizationInterface<string>
    result_content: LocalizationInterface<string>
    result_image: string
    formula_type: FormulaTypeInterface
}

export interface ResultPayloadInterface {
    result_uuid: string
    result_keys: string[]
    result_name: string
    result_content: string
    result_image: string
    formula_type_id: number
}

export interface FormulaTypeInterface {
    formula_type_id: number
    formula_type_name: string
    formula_type_description: string
    formula_type_key: string
}

export type PageType =
    | 'destiny-program'
    | 'strong-qualities'
    | 'fate-card'
    | 'weak-qualities'
    | 'planets'
    | 'karma'
    | 'health'
    | 'blood'
    | 'graph'
    | 'phone-calculation'
    | 'house-calculation'
    | 'prediction'
    | 'birthday-style'
    | 'compatibility'
    | 'color-graph'
    | 'all-formulas'
    | 'fate-number-gifts'
    | 'totemic-animals'
    | 'lucky-numbers'
    | 'angelic-numerology'
    | 'professions'
    | 'guessing-number'
    | 'ancestors'
    | 'placeholder'
