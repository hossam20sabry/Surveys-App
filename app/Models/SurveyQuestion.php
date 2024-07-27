<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'survey_id',
        'type',
        'question',
        'description',
        'data'
    ];


    public function answers()
    {
        return $this->hasMany(SurveyQuestionAnswer::class);
    }
}
