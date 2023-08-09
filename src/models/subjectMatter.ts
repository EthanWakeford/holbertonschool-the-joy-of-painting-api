import { Sequelize, DataTypes, Model } from 'sequelize';

export default async (sequelize: Sequelize): Promise<any> => {
  const Subject = await sequelize.define('Subject', {
    episode: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    apple_frame: {
      type: DataTypes.BOOLEAN,
    },
    aurora_borealis: {
      type: DataTypes.BOOLEAN,
    },
    barn: {
      type: DataTypes.BOOLEAN,
    },
    beach: {
      type: DataTypes.BOOLEAN,
    },
    boat: {
      type: DataTypes.BOOLEAN,
    },
    bridge: {
      type: DataTypes.BOOLEAN,
    },
    building: {
      type: DataTypes.BOOLEAN,
    },
    bushes: {
      type: DataTypes.BOOLEAN,
    },
    cabin: {
      type: DataTypes.BOOLEAN,
    },
    cactus: {
      type: DataTypes.BOOLEAN,
    },
    circle_frame: {
      type: DataTypes.BOOLEAN,
    },
    cirrus: {
      type: DataTypes.BOOLEAN,
    },
    cliff: {
      type: DataTypes.BOOLEAN,
    },
    clouds: {
      type: DataTypes.BOOLEAN,
    },
    conifer: {
      type: DataTypes.BOOLEAN,
    },
    cumulus: {
      type: DataTypes.BOOLEAN,
    },
    deciduous: {
      type: DataTypes.BOOLEAN,
    },
    diane_andre: {
      type: DataTypes.BOOLEAN,
    },
    dock: {
      type: DataTypes.BOOLEAN,
    },
    double_oval_frame: {
      type: DataTypes.BOOLEAN,
    },
    farm: {
      type: DataTypes.BOOLEAN,
    },
    fence: {
      type: DataTypes.BOOLEAN,
    },
    fire: {
      type: DataTypes.BOOLEAN,
    },
    florida_frame: {
      type: DataTypes.BOOLEAN,
    },
    flowers: {
      type: DataTypes.BOOLEAN,
    },
    fog: {
      type: DataTypes.BOOLEAN,
    },
    framed: {
      type: DataTypes.BOOLEAN,
    },
    grass: {
      type: DataTypes.BOOLEAN,
    },
    guest: {
      type: DataTypes.BOOLEAN,
    },
    half_circle_frame: {
      type: DataTypes.BOOLEAN,
    },
    half_oval_frame: {
      type: DataTypes.BOOLEAN,
    },
    hills: {
      type: DataTypes.BOOLEAN,
    },
    lake: {
      type: DataTypes.BOOLEAN,
    },
    lakes: {
      type: DataTypes.BOOLEAN,
    },
    lighthouse: {
      type: DataTypes.BOOLEAN,
    },
    mill: {
      type: DataTypes.BOOLEAN,
    },
    moon: {
      type: DataTypes.BOOLEAN,
    },
    mountain: {
      type: DataTypes.BOOLEAN,
    },
    mountains: {
      type: DataTypes.BOOLEAN,
    },
    night: {
      type: DataTypes.BOOLEAN,
    },
    ocean: {
      type: DataTypes.BOOLEAN,
    },
    oval_frame: {
      type: DataTypes.BOOLEAN,
    },
    palm_trees: {
      type: DataTypes.BOOLEAN,
    },
    path: {
      type: DataTypes.BOOLEAN,
    },
    person: {
      type: DataTypes.BOOLEAN,
    },
    portrait: {
      type: DataTypes.BOOLEAN,
    },
    rectangle_3d_frame: {
      type: DataTypes.BOOLEAN,
    },
    rectangular_frame: {
      type: DataTypes.BOOLEAN,
    },
    river: {
      type: DataTypes.BOOLEAN,
    },
    rocks: {
      type: DataTypes.BOOLEAN,
    },
    seashell_frame: {
      type: DataTypes.BOOLEAN,
    },
    snow: {
      type: DataTypes.BOOLEAN,
    },
    snowy_mountain: {
      type: DataTypes.BOOLEAN,
    },
    split_frame: {
      type: DataTypes.BOOLEAN,
    },
    steve_ross: {
      type: DataTypes.BOOLEAN,
    },
    structure: {
      type: DataTypes.BOOLEAN,
    },
    sun: {
      type: DataTypes.BOOLEAN,
    },
    tomb_frame: {
      type: DataTypes.BOOLEAN,
    },
    tree: {
      type: DataTypes.BOOLEAN,
    },
    trees: {
      type: DataTypes.BOOLEAN,
    },
    triple_frame: {
      type: DataTypes.BOOLEAN,
    },
    waterfall: {
      type: DataTypes.BOOLEAN,
    },
    waves: {
      type: DataTypes.BOOLEAN,
    },
    windmill: {
      type: DataTypes.BOOLEAN,
    },
    window_frame: {
      type: DataTypes.BOOLEAN,
    },
    winter: {
      type: DataTypes.BOOLEAN,
    },
    wood_framed: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Subject;
};
