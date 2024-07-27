<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'expire_date',
        'status',
        'image',
        'created_at',
        'updated_at',
    ];


    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function questions(){
        return $this->hasMany(SurveyQuestion::class);
    }

    public function answers(){
        return $this->hasMany(SurveyAnswer::class);
    }
}
